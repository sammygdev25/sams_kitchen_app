import { Card, CardBody, CardTitle, Price, Button, Stack } from '../components/ui';
import { Icon } from '../components/icons';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
  checkoutDisabled?: boolean;
}

export default function CartSummary({
  subtotal,
  deliveryFee,
  total,
  itemCount,
  onCheckout,
  checkoutDisabled = false,
}: CartSummaryProps) {
  return (
    <Card>
      <CardBody>
        <CardTitle>Order Summary</CardTitle>
        <Stack gap="sm">
          <div className="ds-between">
            <span className="ds-muted">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span>${Number(subtotal || 0).toFixed(2)}</span>
          </div>
          <div className="ds-between">
            <span className="ds-muted">Delivery fee</span>
            <span>{deliveryFee > 0 ? `$${Number(deliveryFee || 0).toFixed(2)}` : 'Free'}</span>
          </div>
          <div className="ds-between">
            <strong>Total</strong>
            <Price value={total} />
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={onCheckout}
            disabled={checkoutDisabled}
          >
            <Icon name="credit-card" size={18} />
            Proceed to Checkout
          </Button>
          <p className="ds-small ds-muted">
            Noodles specials, Indian appetizers and Italian mains from Sam's Kitchen,
            prepared fresh and ready for secure checkout.
          </p>
        </Stack>
      </CardBody>
    </Card>
  );
}