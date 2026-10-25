import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface CheckoutHeaderProps {
  step?: 'cart' | 'details' | 'payment';
}

const STEPS: { key: 'cart' | 'details' | 'payment'; label: string }[] = [
  { key: 'cart', label: 'Cart' },
  { key: 'details', label: 'Details' },
  { key: 'payment', label: 'Payment' },
];

export default function CheckoutHeader({ step = 'details' }: CheckoutHeaderProps) {
  const activeIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <PageHeader
      eyebrow="Sam's Kitchen"
      title="Checkout"
      subtitle="Review your noodles, appetizers and mains, then place your order for secure Stripe payment."
      actions={
        <div className="ds-cluster">
          {STEPS.map((s, index) => (
            <span
              key={s.key}
              className="ds-cluster"
              style={{ alignItems: 'center' }}
            >
              <Icon
                name={index < activeIndex ? 'check' : 'arrow-right'}
                size={14}
                title={s.label}
              />
              <span className={index === activeIndex ? '' : 'ds-muted'}>
                {s.label}
              </span>
            </span>
          ))}
        </div>
      }
    />
  );
}