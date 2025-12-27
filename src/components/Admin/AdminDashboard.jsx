import { useState } from 'react';
import { Package, List, ShoppingBag } from 'lucide-react';
import MenuItemsManager from './MenuItemsManager';
import CategoriesManager from './CategoriesManager';
import OrdersManager from './OrdersManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your restaurant menu and orders</p>

      <div className="flex space-x-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center space-x-2 px-6 py-3 font-medium transition ${
            activeTab === 'menu'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Package size={20} />
          <span>Menu Items</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center space-x-2 px-6 py-3 font-medium transition ${
            activeTab === 'categories'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <List size={20} />
          <span>Categories</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-6 py-3 font-medium transition ${
            activeTab === 'orders'
              ? 'border-b-2 border-primary-600 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <ShoppingBag size={20} />
          <span>Orders</span>
        </button>
      </div>

      {activeTab === 'menu' && <MenuItemsManager />}
      {activeTab === 'categories' && <CategoriesManager />}
      {activeTab === 'orders' && <OrdersManager />}
    </div>
  );
}
