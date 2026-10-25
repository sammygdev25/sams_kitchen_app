import { Badge } from './ui';

interface OrderStatusBadgeProps {
  status: string;
}

type Tone = 'neutral' | 'primary' | 'soft' | 'success' | 'danger';

const STATUS_CONFIG: Record<string, { label: string; tone: Tone }> = {
  pending: { label: 'Pending', tone: 'neutral' },
  paid: { label: 'Paid', tone: 'primary' },
  preparing: { label: 'Preparing', tone: 'soft' },
  ready: { label: 'Ready', tone: 'success' },
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
  canceled: { label: 'Cancelled', tone: 'danger' },
  failed: { label: 'Failed', tone: 'danger' },
};

function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const key = status?.toLowerCase() ?? '';
  const config = STATUS_CONFIG[key] ?? { label: status || 'Unknown', tone: 'neutral' as Tone };

  return <Badge tone={config.tone}>{config.label}</Badge>;
}

export default OrderStatusBadge;
export { OrderStatusBadge };