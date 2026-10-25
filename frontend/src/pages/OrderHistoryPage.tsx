import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList } from '../api';
import type { Order } from '../types';
import OrderHistoryHeader from '../components/OrderHistoryHeader';
import OrderHistoryContent from '../components/OrderHistoryContent';
import OrderHistoryDetails from '../components/OrderHistoryDetails';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await getOrderList();
        if (active) setOrders(data);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const totalSpent = orders.reduce((sum, order) => {
    const amount = typeof order.totalAmount === 'number' ? order.totalAmount : Number(order.totalAmount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="ds-stack-lg">
      <OrderHistoryHeader user={user} />
      <OrderHistoryContent orders={orders} loading={loading} />
      <OrderHistoryDetails user={user} orderCount={orders.length} totalSpent={totalSpent} />
    </div>
  );
}