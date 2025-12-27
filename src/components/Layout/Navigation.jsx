import { Menu, User, ShoppingBag, LogOut, Settings, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../contexts/UserContext';

export default function Navigation({ currentView, onViewChange }) {
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onViewChange('menu');
    } catch (error) {
      alert('Failed to sign out');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onViewChange('menu')}
              className="flex items-center space-x-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition"
            >
              <UtensilsCrossed size={32} />
              <span>MenuMate</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('menu')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === 'menu'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Menu
            </button>

            {user ? (
              <>
                <button
                  onClick={() => onViewChange('orders')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition ${
                    currentView === 'orders'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={18} />
                  <span>My Orders</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => onViewChange('admin')}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition ${
                      currentView === 'admin'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={18} />
                    <span>Admin</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onViewChange('auth')}
                className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
              >
                <User size={18} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
