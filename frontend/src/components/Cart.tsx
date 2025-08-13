import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (productId: number, change: number) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
            Your Cart
          </h1>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 text-center shadow-lg transition-colors duration-300`}>
            <div className="mb-6">
              <svg 
                className={`w-16 h-16 mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-3L5 12m0 0l1.6 8h11.8M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                />
              </svg>
            </div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
              Your cart is empty
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/products"
              className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              className={`px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-500' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400'
              } transition-colors`}
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {cartItems.map(item => (
              <div 
                key={item.productId} 
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={`/${item.product.imgName}`} 
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-100"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                      {item.product.name}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                      {item.product.description}
                    </p>
                    <div className="mt-2">
                      {item.product.discount ? (
                        <div>
                          <span className="text-gray-500 line-through text-sm mr-2">
                            ${item.product.price.toFixed(2)}
                          </span>
                          <span className="text-primary font-bold">
                            ${(item.product.price * (1 - item.product.discount)).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-primary font-bold">${item.product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                      <button 
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        -
                      </button>
                      <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        ${(
                          item.product.discount 
                            ? item.product.price * (1 - item.product.discount) * item.quantity
                            : item.product.price * item.quantity
                        ).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className={`p-2 rounded-lg ${
                        darkMode 
                          ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                      } transition-colors`}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                Order Summary
              </h2>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                  Subtotal
                </span>
                <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between">
                <span className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  Total
                </span>
                <span className={`text-lg font-bold text-primary transition-colors duration-300`}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className={`flex-1 px-6 py-3 rounded-lg border ${
                  darkMode 
                    ? 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-500' 
                    : 'border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400'
                } text-center transition-colors`}
              >
                Continue Shopping
              </Link>
              <button
                className="flex-1 bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}