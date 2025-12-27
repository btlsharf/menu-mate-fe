import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*, menu_item:menu_items(*)')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          return { ...order, items: items || [] };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
      loadOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-primary-100 text-primary-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-600">Orders will appear here once customers start placing them.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Order ID: {order.id.slice(0, 8)} | User ID: {order.user_id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()} at{' '}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className={`px-4 py-2 rounded-lg font-medium ${getStatusColor(order.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="font-bold text-gray-800">Order Items:</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center pl-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.menu_item.name}</p>
                    <p className="text-sm text-gray-600">
                      BD {item.price_at_order.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">
                    BD {(item.price_at_order * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium text-gray-700">Special Instructions:</p>
                <p className="text-sm text-gray-600">{order.notes}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-primary-600">BD {order.total_price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
