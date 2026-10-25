import { Hero, Button, Media } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeHeroProps {
  imageUrl?: string;
}

export default function HomeHero({ imageUrl = '/img/brand/hero.jpg' }: HomeHeroProps) {
  return (
    <Hero
      eyebrow="Sam's Kitchen"
      title="Noodles, Indian appetizers and Italian mains, made fresh tonight"
      text="Our dinner special noodles, crispy Indian starters and classic Italian mains are cooked to order and ready for pickup or delivery. Order online and skip the wait."
      actions={
        <>
          <Button to="/menu-items" variant="primary" size="lg">
            View Menu
            <Icon name="arrow-right" size={18} />
          </Button>
          <Button to="/menu-items?category=dinner-special-noodles" variant="ghost" size="lg">
            Tonight's Specials
          </Button>
        </>
      }
      media={imageUrl ? <Media src={imageUrl} alt="A steaming plate of Sam's Kitchen dinner special noodles" ratio="wide" /> : undefined}
    />
  );
}