import { Section, Stack, Stat } from '../components/ui';
import { Icon } from '../components/icons';
import type { User } from '../types';

interface OrderHistoryDetailsProps {
  user: User | null;
  orderCount: number;
  totalSpent: number;
}

export default function OrderHistoryDetails({ user, orderCount, totalSpent }: OrderHistoryDetailsProps) {
  return (
    <Section
      eyebrow="Your account"
      title="Account details"
      subtitle="A quick look at your Sam's Kitchen ordering history."
      narrow
    >
      <div className="ds-form">
        <Stack gap="md">
          <div className="ds-field">
            <span className="ds-label">Name</span>
            <div className="ds-cluster">
              <Icon name="user" size={16} />
              <span>{user?.username ?? 'Guest'}</span>
            </div>
          </div>
          <div className="ds-field">
            <span className="ds-label">Email</span>
            <div className="ds-cluster">
              <Icon name="mail" size={16} />
              <span>{user?.email ?? '—'}</span>
            </div>
          </div>
        </Stack>

        <div className="ds-grid ds-grid-2" style={{ marginTop: '1.5rem' }}>
          <Stat value={String(orderCount)} label="Orders placed" icon="package" />
          <Stat value={`$${totalSpent.toFixed(2)}`} label="Total spent" icon="dollar" />
        </div>
      </div>
    </Section>
  );
}