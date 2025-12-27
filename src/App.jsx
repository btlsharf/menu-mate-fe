import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/UserContext';
import Navigation from './components/Layout/Navigation';
import Login from './components/Auth/Login';
import Signup from './components/Auth/SignUp';
import MenuBrowser from './components/Menu/MenuBrowser';
import Checkout from './components/Order/Checkout';
import OrderHistory from './components/Order/OrderHistory';
import AdminDashboard from './components/Admin/AdminDashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState('menu');
  const [showLogin, setShowLogin] = useState(true);
  const [cart, setCart] = useState([]);
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (user && currentView === 'auth') {
      setCurrentView('menu');
    }
  }, [user, currentView]);

  const handleCheckout = (cartItems) => {
    setCart(cartItems);
    setCurrentView('checkout');
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setCurrentView('orderSuccess');
    setTimeout(() => setCurrentView('orders'), 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {currentView === 'auth' && !user && (
        showLogin ? (
          <Login onToggle={() => setShowLogin(false)} />
        ) : (
          <Signup onToggle={() => setShowLogin(true)} />
        )
      )}

      {currentView === 'menu' && (
        <MenuBrowser onCheckout={handleCheckout} />
      )}

      {currentView === 'checkout' && user && (
        <Checkout
          cart={cart}
          onBack={() => setCurrentView('menu')}
          onSuccess={handleOrderSuccess}
        />
      )}

      {currentView === 'orders' && user && (
        <OrderHistory />
      )}

      {currentView === 'admin' && user && isAdmin && (
        <AdminDashboard />
      )}

      {currentView === 'orderSuccess' && (
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Order Placed!</h2>
          <p className="success-message">Your order has been successfully placed.</p>
          <p className="success-redirect">Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
