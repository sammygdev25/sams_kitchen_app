import { Section, Split, Media, Badge, Price, Button, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface OrderConfirmationMediaProps {
  order: Order;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'success';
    case 'cancelled':
    case 'failed':
      return 'danger';
    case 'processing':
      return 'primary';
    default:
      return 'soft';
  }
}

export default function OrderConfirmationMedia({ order }: OrderConfirmationMediaProps) {
  const itemCount = order.items?.length ?? 0;

  return (
    <Section tight>
      <Split>
        <Media ratio="square" badge={<Icon name="check" title="Order confirmed" />} />
        <div className="ds-stack">
          <span className="ds-eyebrow">Order Confirmed</span>
          <h1 className="ds-card-title">Thank you for your order, Sam's Kitchen is on it!</h1>
          <CardMeta>
            Order #{order.id} &middot; {itemCount} {itemCount === 1 ? 'item' : 'items'} &middot;{' '}
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardMeta>
          <div className="ds-cluster">
            <Badge tone={statusTone(order.status)}>{order.status}</Badge>
            <Price value={order.totalAmount} />
          </div>
          <div className="ds-form-actions">
            <Button to="/menu-items" variant="primary" size="lg">
              <Icon name="book" /> Order More Dishes
            </Button>
            <Button to="/orders" variant="ghost">
              View Order History
            </Button>
          </div>
        </div>
      </Split>
    </Section>
  );
}