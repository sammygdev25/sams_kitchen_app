import type { Category } from '../types';
import { Section } from '../components/ui';
import { Icon } from '../components/icons';

interface MenuItemListFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function MenuItemListFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sortBy,
  onSortChange,
}: MenuItemListFiltersProps) {
  return (
    <Section tight>
      <div className="ds-filters">
        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-search">
            Search
          </label>
          <div className="ds-cluster">
            <Icon name="search" size={18} />
            <input
              id="menu-search"
              className="input"
              type="text"
              placeholder="Search noodles, appetizers, mains..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-category">
            Category
          </label>
          <select
            id="menu-category"
            className="input"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-sort">
            Sort by
          </label>
          <select
            id="menu-sort"
            className="input"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="special">Dinner Specials First</option>
          </select>
        </div>
      </div>
    </Section>
  );
}