import type { MenuItem } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Media, Price, Badge, Button } from './ui';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const unavailable = !item.isAvailable;

  return (
    <Card className="menu-item-card">
      <Media
        src={item.imageUrl}
        alt={item.name}
        ratio="wide"
        badge={item.isSpecial ? 'Dinner Special' : undefined}
      />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.category?.name && (
          <CardMeta>
            <Badge tone="soft">{item.category?.name}</Badge>
            {unavailable && <Badge tone="danger">Sold out</Badge>}
          </CardMeta>
        )}
        {item.description && <p className="ds-muted ds-small">{item.description}</p>}
        <CardFooter>
          <Price value={item.price} />
          <Button
            variant="primary"
            disabled={unavailable}
            onClick={() => onAddToCart(item)}
          >
            {unavailable ? 'Unavailable' : 'Add to cart'}
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export { MenuItemCard };
export default MenuItemCard;