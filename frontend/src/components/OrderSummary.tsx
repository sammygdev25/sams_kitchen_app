import { Card, CardBody, CardTitle, Price, Stack } from './ui';
import type { CartItem, OrderItem } from '../types';

type SummaryItem = (CartItem | OrderItem) & {
  quantity: number;
  menuItem?: { name: string; price: number | string };
  price?: number | string;
};

interface OrderSummaryProps {
  items: SummaryItem[];
  total: number;
}

function lineLabel(item: SummaryItem): string {
  return item.menuItem?.name ?? 'Menu item';
}

function lineUnitPrice(item: SummaryItem): number {
  const raw = item.menuItem?.price ?? item.price ?? 0;
  return typeof raw === 'string' ? parseFloat(raw) : raw;
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <Card>
      <CardBody>
        <CardTitle>Order Summary</CardTitle>
        <Stack gap="sm">
          {items.length === 0 ? (
            <p className="ds-muted ds-small">Your order is empty.</p>
          ) : (
            items.map((item, idx) => {
              const unitPrice = lineUnitPrice(item);
              const lineTotal = unitPrice * item.quantity;
              return (
                <div className="ds-between" key={('id' in item && item.id) || idx}>
                  <span className="ds-small">
                    {item.quantity}&times; {lineLabel(item)}
                  </span>
                  <span className="ds-small">
                    <Price value={lineTotal} />
                  </span>
                </div>
              );
            })
          )}
        </Stack>
        <div className="ds-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <strong>Total</strong>
          <strong>
            <Price value={total} />
          </strong>
        </div>
      </CardBody>
    </Card>
  );
}

export default OrderSummary;