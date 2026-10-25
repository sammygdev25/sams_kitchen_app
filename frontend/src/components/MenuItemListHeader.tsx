import { PageHeader } from '../components/ui';

interface MenuItemListHeaderProps {
  resultCount?: number;
  loading?: boolean;
}

export default function MenuItemListHeader({ resultCount, loading }: MenuItemListHeaderProps) {
  const subtitle =
    !loading && typeof resultCount === 'number'
      ? `${resultCount} ${resultCount === 1 ? 'dish' : 'dishes'} ready to order`
      : 'Noodles dinner specials, Indian appetizers and Italian mains, made fresh to order';

  return (
    <PageHeader
      eyebrow="Sam's Kitchen Menu"
      title="Our Full Menu"
      subtitle={subtitle}
    />
  );
}