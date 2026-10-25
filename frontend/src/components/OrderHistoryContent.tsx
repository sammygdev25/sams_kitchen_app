import { Link } from 'react-router-dom';
import { Section, EmptyState, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface OrderHistoryContentProps {
  orders: Order[];
  loading?: boolean;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'paid':
    case 'completed':
    case 'delivered':
      return 'success';
    case 'cancelled':
    case 'failed':
      return 'danger';
    case 'pending':
      return 'soft';
    default:
      return 'neutral';
  }
}

export default function OrderHistoryContent({ orders, loading }: OrderHistoryContentProps) {
  if (loading) {
    return (
      <Section title="Your orders" eyebrow="Sam's Kitchen" tight>
        <div className="ds-loading">
          <Icon name="refresh" />
          <span>Loading your orders...</span>
        </div>
      </Section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Section title="Your orders" eyebrow="Sam's Kitchen" tight>
        <EmptyState
          icon="package"
          title="No orders yet"
          text="Once you order the dinner specials, Indian appetizers or Italian mains, they'll show up here."
          action={
            <Button to="/menu-items" variant="primary">
              Browse the menu
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <Section title="Your orders" eyebrow="Sam's Kitchen" tight>
      <div className="ds-table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items && order.items.length > 0
                    ? `${order.items.length} item${order.items.length > 1 ? 's' : ''}`
                    : '—'}
                </td>
                <td>${Number(order.totalAmount).toFixed(2)}</td>
                <td>
                  <Badge tone={statusTone(order.status)}>{order.status}</Badge>
                </td>
                <td>
                  <Link to={`/order-confirmation/${order.id}`} className="ds-cluster">
                    View <Icon name="arrow-right" size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}