import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="ds-cluster" role="tablist" aria-label="Menu categories">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === ''}
        className="btn"
        style={{
          background: activeCategory === '' ? 'var(--color-primary)' : 'var(--color-surface)',
          color: activeCategory === '' ? '#fff' : 'var(--color-text)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg, 10px)',
        }}
        onClick={() => onSelectCategory('')}
      >
        All Dishes
      </button>
      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className="btn"
            style={{
              background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isActive ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg, 10px)',
            }}
            onClick={() => onSelectCategory(category.slug)}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
export { CategoryTabs };