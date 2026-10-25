import { useEffect, useState, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import { getMenuItemList, getCategoryList } from '../api';
import type { MenuItem, Category } from '../types';
import HomeHero from '../components/HomeHero';
import HomeFeatured from '../components/HomeFeatured';
import HomeCategories from '../components/HomeCategories';
import HomeAbout from '../components/HomeAbout';
import HomeCta from '../components/HomeCta';

export default function HomePage() {
  const { addItem } = useCart();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [menuItems, cats] = await Promise.all([
          getMenuItemList(),
          getCategoryList(),
        ]);
        if (!active) return;
        setItems(menuItems);
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addItem(item, 1);
    },
    [addItem]
  );

  const featured = items
    .filter((item) => item.isAvailable)
    .sort((a, b) => Number(b.isSpecial) - Number(a.isSpecial))
    .slice(0, 8);

  const heroImage = items.find((item) => item.imageUrl)?.imageUrl;

  return (
    <div className="ds-stack-lg">
      <HomeHero imageUrl={heroImage} />
      <HomeFeatured items={featured} loading={loading} onAddToCart={handleAddToCart} />
      <HomeCategories categories={categories} />
      <HomeAbout />
      <HomeCta />
    </div>
  );
}