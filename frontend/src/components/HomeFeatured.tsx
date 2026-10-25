import { Section, Grid, Card, CardBody, CardTitle, CardMeta, Price, Badge, Media, SkeletonCards, EmptyState, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface HomeFeaturedProps {
  items: MenuItem[];
  loading?: boolean;
  onAddToCart: (item: MenuItem) => void;
}

export default function HomeFeatured({ items, loading, onAddToCart }: HomeFeaturedProps) {
  return (
    <Section
      eyebrow="Chef's picks"
      title="Featured dishes"
      subtitle="Dinner special noodles, Indian appetizers and Italian mains, made fresh at Sam's Kitchen."
    >
      {loading ? (
        <SkeletonCards count={8} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="package"
          title="No featured dishes yet"
          text="Check back soon for Sam's Kitchen specials."
          action={<Button to="/menu-items">Browse full menu</Button>}
        />
      ) : (
        <Grid size="md" cols={4}>
          {items.slice(0, 8).map((item) => (
            <Card key={item.id}>
              <Media
                src={item.imageUrl}
                alt={item.name}
                ratio="square"
                badge={item.isSpecial ? 'Dinner special' : undefined}
              />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.category?.name && (
                  <CardMeta>
                    <Icon name="tag" size={14} /> {item.category?.name}
                  </CardMeta>
                )}
                <div className="ds-between">
                  <Price value={item.price} />
                  {!item.isAvailable && <Badge tone="neutral">Sold out</Badge>}
                </div>
                <Button
                  variant="primary"
                  disabled={!item.isAvailable}
                  onClick={() => onAddToCart(item)}
                >
                  <Icon name="cart" size={16} /> Add to cart
                </Button>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}