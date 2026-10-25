import { PageHeader } from '../components/ui';
import type { User } from '../types';

interface OrderHistoryHeaderProps {
  user: User | null;
}

export default function OrderHistoryHeader({ user }: OrderHistoryHeaderProps) {
  const displayName = user?.username || user?.email || 'guest';

  return (
    <PageHeader
      eyebrow="Sam's Kitchen"
      title="Your order history"
      subtitle={`Every noodle special, Indian appetizer and Italian main you've ordered, ${displayName}.`}
    />
  );
}