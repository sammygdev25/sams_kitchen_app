import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartHeader from '../components/CartHeader';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';

const DELIVERY_FEE = 4.99;

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const deliveryFee = itemCount > 0 ? DELIVERY_FEE : 0;
  const grandTotal = total + deliveryFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="ds-stack-lg">
      <CartHeader itemCount={itemCount} />
      <div className="ds-container">
        <div className="ds-grid-sidebar">
          <CartItems items={items} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          <CartSummary
            subtotal={total}
            deliveryFee={deliveryFee}
            total={grandTotal}
            itemCount={itemCount}
            onCheckout={handleCheckout}
            checkoutDisabled={itemCount === 0}
          />
        </div>
      </div>
    </div>
  );
}