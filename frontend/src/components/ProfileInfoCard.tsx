import { useState } from 'react';
import type { User } from '../types';
import { api } from '../api';
import { Button, Icon, Alert } from './ui';

interface ProfileInfoCardProps {
  user: User;
  onUpdate: (user: User) => void;
}

function ProfileInfoCard({ user, onUpdate }: ProfileInfoCardProps) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName ?? '');
  const [lastName, setLastName] = useState(user.lastName ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const startEdit = () => {
    setFirstName(user.firstName ?? '');
    setLastName(user.lastName ?? '');
    setEmail(user.email ?? '');
    setError('');
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await api.put('/auth/profile/', { firstName, lastName, email });
      onUpdate(updated);
      setEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Could not update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ds-card">
      <div className="ds-card-body">
        <div className="ds-between">
          <h3 className="ds-card-title">Your Details</h3>
          {!editing && (
            <Button variant="ghost" onClick={startEdit}>
              <Icon name="edit" size={16} /> Edit
            </Button>
          )}
        </div>

        {error && <Alert tone="danger">{error}</Alert>}

        {!editing ? (
          <div className="ds-stack">
            <div className="ds-field">
              <span className="ds-label">Username</span>
              <span>{user.username}</span>
            </div>
            <div className="ds-field">
              <span className="ds-label">Name</span>
              <span>
                {user.firstName || user.lastName
                  ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                  : 'Not set yet — add your name so we know who to call when your order from Sam\'s Kitchen is ready.'}
              </span>
            </div>
            <div className="ds-field">
              <span className="ds-label">Email</span>
              <span>{user.email || 'No email on file'}</span>
            </div>
          </div>
        ) : (
          <form className="ds-form" onSubmit={handleSave}>
            <div className="ds-form-row">
              <div className="ds-field">
                <label className="ds-label" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div className="ds-field">
                <label className="ds-label" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="ds-field">
              <label className="ds-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="ds-form-actions">
              <Button variant="secondary" type="button" onClick={cancelEdit} disabled={saving}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileInfoCard;
export { ProfileInfoCard };