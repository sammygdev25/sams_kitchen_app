import { Section, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeCtaProps {
  title?: string;
  text?: string;
}

export default function HomeCta({
  title = "Hungry for noodles, appetizers or Italian mains?",
  text = "Browse Sam's Kitchen full menu and get tonight's dinner specials delivered hot to your door.",
}: HomeCtaProps) {
  return (
    <Section tight>
      <div className="ds-hero" style={{ textAlign: 'center' }}>
        <h2>{title}</h2>
        <p className="ds-lead">{text}</p>
        <div className="ds-cluster" style={{ justifyContent: 'center' }}>
          <Button to="/menu-items" variant="primary" size="lg">
            View Full Menu
            <Icon name="arrow-right" size={18} />
          </Button>
          <Button to="/register" variant="ghost" size="lg">
            Create an Account
          </Button>
        </div>
      </div>
    </Section>
  );
}