import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Media, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface OrderConfirmationRelatedProps {
  items: MenuItem[];
  onAddItem?: (item: MenuItem) => void;
}

export default function OrderConfirmationRelated({ items, onAddItem }: OrderConfirmationRelatedProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section
      eyebrow="You might also like"
      title="More from Sam's Kitchen"
      subtitle="Round out your next order with a few more favorites from our noodles, appetizers and Italian mains."
    >
      <Grid size="sm">
        {items.map((item) => (
          <Card key={item.id}>
            <Media src={item.imageUrl} alt={item.name} ratio="square" badge={item.isSpecial ? 'Special' : undefined} />
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              {item.description && <CardMeta>{item.description}</CardMeta>}
              <CardFooter>
                <Price value={item.price} />
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => onAddItem?.(item)}
                  disabled={!item.isAvailable}
                >
                  <Icon name="plus" size={16} />
                  {item.isAvailable ? 'Add to cart' : 'Sold out'}
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}