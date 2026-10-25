import { Section, Card, CardBody, Media, Button, EmptyState, Stack, Price } from '../components/ui';
import { Icon } from '../components/icons';
import type { CartItem } from '../contexts/CartContext';

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
}

export default function CartItems({ items, onUpdateQuantity, onRemove }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <Section eyebrow="Your Order" title="Cart Items">
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          text="Browse noodles dinner specials, Indian appetizers and Italian mains to start your order."
          action={<Button to="/menu-items" variant="primary">Browse the Menu</Button>}
        />
      </Section>
    );
  }

  return (
    <Section eyebrow="Your Order" title="Cart Items">
      <Stack gap="md">
        {items.map((item) => (
          <Card key={item.menuItemId} className="ds-cart-item">
            <CardBody>
              <div className="ds-cluster ds-between">
                <div className="ds-cluster">
                  <Media src={item.imageUrl} alt={item.name} ratio="square" />
                  <div>
                    <p className="ds-card-title">{item.name}</p>
                    <p className="ds-muted ds-small">
                      <Price value={item.price} /> each
                    </p>
                  </div>
                </div>
                <div className="ds-cluster" style={{ alignItems: 'center' }}>
                  <Button
                    variant="ghost"
                    size="md"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => onUpdateQuantity(item.menuItemId, item.quantity - 1)}
                  >
                    <Icon name="minus" size={16} />
                  </Button>
                  <span className="ds-small">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="md"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => onUpdateQuantity(item.menuItemId, item.quantity + 1)}
                  >
                    <Icon name="plus" size={16} />
                  </Button>
                  <Price value={item.price * item.quantity} />
                  <Button
                    variant="ghost"
                    size="md"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => onRemove(item.menuItemId)}
                  >
                    <Icon name="trash" size={16} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Section>
  );
}