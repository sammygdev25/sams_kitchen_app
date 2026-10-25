import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { api } from '../api';
import { Alert, Stack } from '../components/ui';
import CheckoutHeader from '../components/CheckoutHeader';
import CheckoutForm, { CheckoutDetails } from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';

interface CreatedOrder {
  id: number;
}

interface CheckoutSession {
  url?: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async (submitted?: CheckoutDetails) => {
    const finalDetails = submitted ?? details;
    if (!finalDetails) {
      setError('Please fill in your delivery and contact details before placing your order.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty. Add some dishes from the menu first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const order: CreatedOrder = await api.post('/orders/', {
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      });

      let checkoutUrl: string | undefined;
      try {
        const session: CheckoutSession = await api.post('/payments/create-checkout-session/', {
          orderId: order.id,
        });
        checkoutUrl = session?.url;
      } catch {
        checkoutUrl = undefined;
      }

      clearCart();

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        navigate(`/order-confirmation/${order.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = (submittedDetails: CheckoutDetails) => {
    setDetails(submittedDetails);
    placeOrder(submittedDetails);
  };

  return (
    <Stack gap="lg">
      <CheckoutHeader step={details ? 'payment' : 'details'} />
      {error && <Alert tone="danger">{error}</Alert>}
      <CheckoutForm onSubmit={handleDetailsSubmit} loading={loading} />
      <CheckoutSummary
        items={items}
        total={total}
        onSubmit={() => placeOrder()}
        loading={loading}
        disabled={items.length === 0}
      />
    </Stack>
  );
}
