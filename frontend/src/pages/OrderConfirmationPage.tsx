import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, getMenuItemList } from '../api';
import { useCart } from '../contexts/CartContext';
import { OrderSummary } from '../components/OrderSummary';
import OrderConfirmationMedia from '../components/OrderConfirmationMedia';
import OrderConfirmationFacts from '../components/OrderConfirmationFacts';
import OrderConfirmationRelated from '../components/OrderConfirmationRelated';
import { LoadingBlock, Alert, EmptyState } from '../components/ui';
import type { Order, MenuItem } from '../types';

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const orderId = Number(id);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      setError('Invalid order id.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError('');

    getOrder(orderId)
      .then(async (data) => {
        if (cancelled) return;
        setOrder(data);

        const categoryId = data.items?.[0]?.menuItem?.category;
        const allItems = await getMenuItemList();
        if (cancelled) return;

        const related = allItems
          .filter((m) => m.id !== data.items?.[0]?.menuItem?.id)
          .filter((m) => (categoryId ? m.category === categoryId : true))
          .slice(0, 6);
        setRelatedItems(related);
      })
      .catch((err) => {
        console.error('[OrderConfirmationPage] Error:', err);
        if (!cancelled) setError('We could not find that order.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <LoadingBlock label="Loading your order..." />;
  }

  if (error || !order) {
    return (
      <EmptyState
        icon="alert"
        title="Order not found"
        text={error || "We couldn't load the details for this order."}
      />
    );
  }

  const summaryItems = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="ds-stack-lg">
      <OrderConfirmationMedia order={order} />
      <OrderConfirmationFacts order={order} />
      <OrderSummary items={summaryItems} total={order.totalAmount} />
      {relatedItems.length > 0 && (
        <OrderConfirmationRelated items={relatedItems} onAddItem={(item) => addItem(item)} />
      )}
      {error && <Alert tone="danger">{error}</Alert>}
    </div>
  );
}
