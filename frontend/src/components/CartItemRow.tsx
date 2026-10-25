import type { CartItem } from '../contexts/CartContext';
import { Media, Price, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="ds-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
      <div style={{ width: '88px', flexShrink: 0 }}>
        <Media src={item.imageUrl} alt={item.name} ratio="square" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="ds-card-title">{item.name}</div>
        <div className="ds-card-meta">
          <Price value={item.price} /> each
        </div>
      </div>

      <div className="ds-cluster" style={{ alignItems: 'center' }}>
        <Button
          variant="ghost"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.menuItemId, item.quantity - 1)}
        >
          <Icon name="minus" size={16} />
        </Button>
        <span className="ds-small" style={{ minWidth: '1.5rem', textAlign: 'center' }}>
          {item.quantity}
        </span>
        <Button
          variant="ghost"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => onUpdateQuantity(item.menuItemId, item.quantity + 1)}
        >
          <Icon name="plus" size={16} />
        </Button>
      </div>

      <div style={{ minWidth: '80px', textAlign: 'right' }}>
        <Price value={lineTotal} />
      </div>

      <Button
        variant="ghost"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => onRemove(item.menuItemId)}
      >
        <Icon name="trash" size={16} />
      </Button>
    </div>
  );
}

export { CartItemRow };
export default CartItemRow;