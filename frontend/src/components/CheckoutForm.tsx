import { useState, FormEvent } from 'react';
import { Section, WithSidebar, Button, Alert, Stack } from '../components/ui';
import { Icon } from '../components/icons';

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  notes: string;
}

interface CheckoutFormProps {
  onSubmit: (details: CheckoutDetails) => void;
  loading: boolean;
}

export default function CheckoutForm({ onSubmit, loading }: CheckoutFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError('Please enter your name and phone number so Sam\'s Kitchen can reach you.');
      return;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setError('Please enter a delivery address, or switch to pickup.');
      return;
    }
    setError('');
    onSubmit({ fullName, phone, address, deliveryMethod, notes });
  };

  return (
    <Section eyebrow="Checkout" title="Delivery & contact details" tight>
      <WithSidebar
        sidebar={
          <Stack gap="sm">
            <div className="ds-card ds-card-body">
              <p className="ds-small ds-muted">Estimated time</p>
              <p><Icon name="clock" size={16} /> {deliveryMethod === 'delivery' ? '35-45 min delivery' : '15-20 min pickup'}</p>
            </div>
            <div className="ds-card ds-card-body">
              <p className="ds-small ds-muted">Accepted payment</p>
              <p><Icon name="credit-card" size={16} /> Secure card payment via Stripe</p>
            </div>
          </Stack>
        }
      >
        <form className="ds-form" onSubmit={handleSubmit}>
          {error && <Alert tone="danger">{error}</Alert>}

          <div className="ds-form-row">
            <div className="ds-field">
              <label className="ds-label" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="ds-field">
              <label className="ds-label" htmlFor="phone">Phone</label>
              <input
                id="phone"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="ds-field">
            <label className="ds-label">How would you like your order?</label>
            <div className="ds-cluster">
              <Button
                type="button"
                variant={deliveryMethod === 'delivery' ? 'primary' : 'secondary'}
                onClick={() => setDeliveryMethod('delivery')}
              >
                <Icon name="truck" size={16} /> Delivery
              </Button>
              <Button
                type="button"
                variant={deliveryMethod === 'pickup' ? 'primary' : 'secondary'}
                onClick={() => setDeliveryMethod('pickup')}
              >
                <Icon name="package" size={16} /> Pickup
              </Button>
            </div>
          </div>

          {deliveryMethod === 'delivery' && (
            <div className="ds-field">
              <label className="ds-label" htmlFor="address">Delivery address</label>
              <input
                id="address"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, city, zip"
              />
            </div>
          )}

          <div className="ds-field">
            <label className="ds-label" htmlFor="notes">Notes for the kitchen</label>
            <textarea
              id="notes"
              className="input"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Spice level, allergies, extra naan..."
            />
            <p className="ds-help">Let us know about allergies or heat preference for our Indian appetizers.</p>
          </div>

          <div className="ds-form-actions">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? 'Placing order...' : 'Continue to payment'}
            </Button>
          </div>
        </form>
      </WithSidebar>
    </Section>
  );
}