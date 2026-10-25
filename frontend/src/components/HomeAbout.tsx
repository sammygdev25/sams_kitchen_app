import { Section, Split } from '../components/ui';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface ValuePoint {
  icon: IconName;
  title: string;
  text: string;
}

interface HomeAboutProps {
  title?: string;
  story?: string;
  values?: ValuePoint[];
}

const DEFAULT_VALUES: ValuePoint[] = [
  {
    icon: 'sparkle',
    title: 'Dinner Special Noodles',
    text: 'Wok-tossed every evening with a rotating lineup of broths, sauces and fresh vegetables.',
  },
  {
    icon: 'heart',
    title: 'Indian Appetizers',
    text: 'Hand-spiced samosas, pakoras and chaat, made in small batches the way they should be.',
  },
  {
    icon: 'award',
    title: 'Italian Mains',
    text: 'Classic pastas and wood-style sauces finished to order, never rushed.',
  },
];

export default function HomeAbout({
  title = "Sam's Kitchen",
  story = "Sam's Kitchen started as a single kitchen with one simple idea: good food shouldn't be boxed into one cuisine. We fold noodle-bar dinner specials, Indian street-food appetizers and Italian comfort mains into a single menu, cooked fresh and delivered straight to your door. Every dish on our menu is made to order by cooks who grew up on these flavors.",
  values = DEFAULT_VALUES,
}: HomeAboutProps) {
  return (
    <Section eyebrow="Our story" title={title}>
      <Split>
        <div className="ds-stack">
          <p className="ds-lead">{story}</p>
          <p className="ds-muted">
            From the wok to the tandoor to the stovetop, our cooks bring three
            culinary traditions together under one roof so you can order a
            whole table of different cuisines in a single checkout.
          </p>
        </div>
        <div className="ds-stack">
          {values.map((value) => (
            <div key={value.title} className="ds-card ds-card-body ds-cluster">
              <Icon name={value.icon} size={24} title={value.title} />
              <div>
                <h3 className="ds-card-title">{value.title}</h3>
                <p className="ds-card-meta">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Split>
    </Section>
  );
}