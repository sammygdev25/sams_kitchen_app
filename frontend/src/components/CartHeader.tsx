import { PageHeader } from '../components/ui';

export interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <PageHeader
      eyebrow="Sam's Kitchen"
      title="Your Cart"
      subtitle={
        itemCount > 0
          ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'} ready for noodles, appetizers and Italian mains`
          : 'Add some noodles, Indian appetizers or Italian mains to get started'
      }
    />
  );
}