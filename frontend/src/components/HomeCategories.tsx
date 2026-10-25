import { Section, Grid, Card, CardBody, CardTitle, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';
import type { Category } from '../types';

interface HomeCategoriesProps {
  categories: Category[];
}

const CATEGORY_ICONS: Record<string, 'sparkle' | 'star' | 'book'> = {
  'dinner-special-noodles': 'sparkle',
  'indian-appetizers': 'star',
  'italian-mains': 'book',
};

export default function HomeCategories({ categories }: HomeCategoriesProps) {
  if (!categories || categories.length === 0) {
    return (
      <Section
        eyebrow="How it works"
        title="From our kitchen to your table"
        subtitle="Three simple steps to get Sam's Kitchen favorites on your plate"
      >
        <Grid size="sm" cols={3}>
          <Card>
            <CardBody>
              <CardTitle>1. Browse the menu</CardTitle>
              <CardMeta>Explore dinner special noodles, Indian appetizers and Italian mains.</CardMeta>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>2. Place your order</CardTitle>
              <CardMeta>Add your favorites to the cart and checkout securely.</CardMeta>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>3. Enjoy the meal</CardTitle>
              <CardMeta>We prepare it fresh and get it to you fast.</CardMeta>
            </CardBody>
          </Card>
        </Grid>
      </Section>
    );
  }

  return (
    <Section
      eyebrow="Browse by category"
      title="Find your flavor"
      subtitle="From comforting noodle specials to vibrant Indian appetizers and classic Italian mains"
    >
      <Grid size="sm" cols={3}>
        {categories.map((category) => (
          <Card key={category.id} to={`/menu-items?category=${category.slug}`}>
            <CardBody>
              <Icon name={CATEGORY_ICONS[category.slug] ?? 'tag'} size={28} />
              <CardTitle>{category.name}</CardTitle>
              {category.description && <CardMeta>{category.description}</CardMeta>}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}