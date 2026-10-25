import { Section, Grid, Card, CardBody, CardTitle, CardMeta, Media, Price, Badge, SkeletonCards, EmptyState, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface MenuItemListGridProps {
  items: MenuItem[];
  loading: boolean;
  onAddToCart: (item: MenuItem) => void;
  onClearFilters?: () => void;
}

export default function MenuItemListGrid({ items, loading, onAddToCart, onClearFilters }: MenuItemListGridProps) {
  if (loading) {
    return (
      <Section title="Our Menu" subtitle="Noodles dinner specials, Indian appetizers and Italian mains, made fresh at Sam's Kitchen">
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (!items.length) {
    return (
      <Section title="Our Menu" subtitle="Noodles dinner specials, Indian appetizers and Italian mains, made fresh at Sam's Kitchen">
        <EmptyState
          icon="package"
          title="No dishes match your search"
          text="Try a different category or clear your filters to see the full menu."
          action={
            onClearFilters ? (
              <Button variant="primary" onClick={onClearFilters}>Clear filters</Button>
            ) : undefined
          }
        />
      </Section>
    );
  }

  return (
    <Section title="Our Menu" subtitle="Noodles dinner specials, Indian appetizers and Italian mains, made fresh at Sam's Kitchen">
      <Grid size="md" cols={3}>
        {items.map((item) => (
          <Card key={item.id}>
            <Media
              src={item.imageUrl}
              alt={item.name}
              ratio="wide"
              badge={item.isSpecial ? 'Dinner Special' : undefined}
            />
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardMeta>{item.description}</CardMeta>
              <div className="ds-between">
                <Price value={item.price} />
                {!item.isAvailable && <Badge tone="danger">Sold out</Badge>}
              </div>
              <div className="ds-card-footer">
                <Button
                  variant="primary"
                  disabled={!item.isAvailable}
                  onClick={() => onAddToCart(item)}
                >
                  <Icon name="cart" size={16} /> Add to cart
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}