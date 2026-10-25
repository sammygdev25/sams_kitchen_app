import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button, EmptyState, Price, Stack } from './ui';
import { Icon } from './icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goToCart = () => {
    onClose();
    navigate('/cart');
  };

  const goToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="cart-sidebar-overlay" onClick={onClose}>
      <aside
        className="cart-sidebar"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '380px',
          maxWidth: '100vw',
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.4)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="ds-between"
          style={{
            padding: '1.25rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading, inherit)' }}>
            Your Order {itemCount > 0 ? `(${itemCount})` : ''}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
            }}
          >
            <Icon name="close" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {items.length === 0 ? (
            <EmptyState
              icon="cart"
              title="Your cart is empty"
              text="Add some noodles, appetizers or an Italian main to get started."
              action={
                <Button variant="primary" onClick={goToCart}>
                  Browse menu
                </Button>
              }
            />
          ) : (
            <Stack gap="sm">
              {items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="ds-between"
                  style={{
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div className="ds-small ds-muted">
                      <Price value={item.price} /> x {item.quantity}
                    </div>
                    <div className="ds-cluster" style={{ marginTop: '0.35rem' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.1rem 0.5rem' }}
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity - 1)
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.1rem 0.5rem' }}
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity + 1)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Icon name="plus" size={14} />
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '0.1rem 0.5rem' }}
                        onClick={() => removeItem(item.menuItemId)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  </div>
                  <Price value={item.price * item.quantity} />
                </div>
              ))}
            </Stack>
          )}
        </div>

        {items.length > 0 && (
          <div
            style={{
              padding: '1.25rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="ds-between" style={{ marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600 }}>Total</span>
              <Price value={total} />
            </div>
            <Stack gap="sm">
              <Button variant="primary" size="lg" onClick={goToCheckout}>
                Checkout
              </Button>
              <Button variant="ghost" onClick={goToCart}>
                View cart
              </Button>
            </Stack>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartSidebar;
export { CartSidebar };