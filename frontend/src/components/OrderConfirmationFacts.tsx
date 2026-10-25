import type { Order } from '../types';
import { Section, Grid, Badge, Price } from '../components/ui';
import { Icon } from '../components/icons';

interface OrderConfirmationFactsProps {
  order: Order;
}

function formatDate(value?: string | null): string {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function statusTone(status: string): 'neutral' | 'primary' | 'success' | 'danger' {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'success';
    case 'cancelled':
    case 'failed':
      return 'danger';
    case 'pending':
      return 'primary';
    default:
      return 'neutral';
  }
}

export default function OrderConfirmationFacts({ order }: OrderConfirmationFactsProps) {
  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Section
      eyebrow="Receipt"
      title="Order details"
      subtitle="Everything we have on file for this Sam's Kitchen order."
    >
      <Grid cols={2} size="sm">
        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="package" size={18} />
            <span className="ds-label">Order number</span>
          </div>
          <p className="ds-card-title">#{order.id}</p>
        </div>

        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="info" size={18} />
            <span className="ds-label">Status</span>
          </div>
          <Badge tone={statusTone(order.status)}>{order.status}</Badge>
        </div>

        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="calendar" size={18} />
            <span className="ds-label">Placed on</span>
          </div>
          <p>{formatDate(order.createdAt)}</p>
        </div>

        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="clock" size={18} />
            <span className="ds-label">Last updated</span>
          </div>
          <p>{formatDate(order.updatedAt)}</p>
        </div>

        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="list" size={18} />
            <span className="ds-label">Items ordered</span>
          </div>
          <p>{itemCount} dish{itemCount === 1 ? '' : 'es'} from noodles, appetizers &amp; mains</p>
        </div>

        <div className="ds-card ds-card-body">
          <div className="ds-cluster">
            <Icon name="dollar" size={18} />
            <span className="ds-label">Total charged</span>
          </div>
          <Price value={order.totalAmount} />
        </div>

        {order.stripeCheckoutSessionId && (
          <div className="ds-card ds-card-body">
            <div className="ds-cluster">
              <Icon name="credit-card" size={18} />
              <span className="ds-label">Payment reference</span>
            </div>
            <p className="ds-small ds-muted">{order.stripeCheckoutSessionId}</p>
          </div>
        )}
      </Grid>
    </Section>
  );
}