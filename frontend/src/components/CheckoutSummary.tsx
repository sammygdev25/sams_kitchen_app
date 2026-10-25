import { Card, CardBody, CardTitle, CardFooter, Price, Media, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { CartItem } from '../types';

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
  onSubmit: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function CheckoutSummary({ items, total, onSubmit, loading, disabled }: CheckoutSummaryProps) {
  return (
    <Card>
      <CardBody>
        <CardTitle>Your order from Sam's Kitchen</CardTitle>
        <div className="ds-stack" style={{ gap: 'var(--space-sm, 12px)' }}>
          {items.map((item) => (
            <div className="ds-cluster ds-between" key={item.menuItem.id}>
              <div className="ds-cluster" style={{ alignItems: 'center' }}>
                <Media
                  src={item.menuItem.imageUrl}
                  alt={item.menuItem.name}
                  ratio="square"
                />
                <div>
                  <div>{item.menuItem.name}</div>
                  <span className="ds-muted ds-small">Qty {item.quantity}</span>
                </div>
              </div>
              <Price value={item.menuItem.price * item.quantity} />
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className="ds-stack" style={{ width: '100%' }}>
          <div className="ds-between">
            <span>Noodles, appetizers &amp; Italian mains total</span>
            <Price value={total} />
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={onSubmit}
            disabled={disabled || loading || items.length === 0}
          >
            <Icon name="credit-card" size={18} />
            {loading ? 'Placing order…' : 'Place order & pay'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}