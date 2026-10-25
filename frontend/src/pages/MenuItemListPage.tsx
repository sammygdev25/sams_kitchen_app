import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMenuItemList, getCategoryList } from '../api';
import { useCart } from '../contexts/CartContext';
import type { MenuItem, Category } from '../types';
import MenuItemListHeader from '../components/MenuItemListHeader';
import MenuItemListFilters from '../components/MenuItemListFilters';
import MenuItemListGrid from '../components/MenuItemListGrid';
import MenuItemListPagination from '../components/MenuItemListPagination';

const PAGE_SIZE = 9;

export default function MenuItemListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [menuItems, cats] = await Promise.all([getMenuItemList(), getCategoryList()]);
        if (!active) return;
        setItems(menuItems);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load menu items', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    setCategory(urlCategory);
  }, [searchParams]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      setPage(1);
      if (value) {
        setSearchParams({ category: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setCategory('');
    setSortBy('name');
    setPage(1);
    setSearchParams({});
  }, [setSearchParams]);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => item.isAvailable !== false);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    if (category) {
      result = result.filter((item) => {
        const cat = categories.find((c) => c.slug === category);
        return cat ? item.categoryId === cat.id : true;
      });
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'special') return (b.isSpecial ? 1 : 0) - (a.isSpecial ? 1 : 0);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [items, search, category, sortBy, categories]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pagedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, page]);

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addItem(item, 1);
    },
    [addItem]
  );

  return (
    <div className="ds-stack-lg">
      <MenuItemListHeader resultCount={filteredItems.length} loading={loading} />
      <MenuItemListFilters
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <MenuItemListGrid
        items={pagedItems}
        loading={loading}
        onAddToCart={handleAddToCart}
        onClearFilters={handleClearFilters}
      />
      <MenuItemListPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}