import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // A seeded database is never seeded twice (the image runs this on every boot with SEED_DEMO=1).
  if ((await prisma.user.count()) > 0 && process.env.SEED_FORCE !== '1') {
    console.log('Seed skipped: the database already has users (SEED_FORCE=1 seeds anyway).');
    return;
  }

  // Create demo user
  // The demo password is this project's own (SEED_DEMO_PASSWORD in backend/.env, made at generation, never shipped):
  // no generated app shares a known password. Without it there are no demo accounts and no demo data.
  const demoPassword = process.env.SEED_DEMO_PASSWORD || '';
  if (!demoPassword) {
    console.warn('[seed] SEED_DEMO_PASSWORD is not set: no demo accounts and no demo data.');
    return;
  }
  const hashedPassword = await bcrypt.hash(demoPassword, 10);
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: { isStaff: true },
    create: {
      isStaff: true,
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
    },
  });

  // Create demo staff user (staff, the same demo password)
  await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      username: 'staff',
      email: 'staff@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'Staff',
      isStaff: true,
    },
  });

  // Domain seed data
  try {
    await prisma.category.create({ data: { name: 'Noodles Dinner Specials', slug: 'noodles-dinner-specials', description: 'Hand-pulled and stir-fried noodle dishes served as hearty evening specials.' } });
    await prisma.category.create({ data: { name: 'Indian Appetizers', slug: 'indian-appetizers', description: 'Spiced starters inspired by North and South Indian street food traditions.' } });
    await prisma.category.create({ data: { name: 'Italian Mains', slug: 'italian-mains', description: 'Classic pasta, risotto, and baked entrees rooted in rustic Italian cooking.' } });
    await prisma.category.create({ data: { name: 'Soups & Salads', slug: 'soups-and-salads', description: 'Light, fresh bowls perfect for starting a meal or a lighter dinner option.' } });
    await prisma.category.create({ data: { name: 'Desserts', slug: 'desserts', description: 'Sweet finishes blending Indian, Italian, and classic American flavors.' } });
    await prisma.category.create({ data: { name: 'Beverages', slug: 'beverages', description: 'Refreshing drinks including lassis, Italian sodas, and house-brewed teas.' } });
    await prisma.category.create({ data: { name: 'Vegan Specialties', slug: 'vegan-specialties', description: 'Plant-based dishes crafted with the same bold spices and rich sauces.' } });
    await prisma.category.create({ data: { name: 'Breads & Sides', slug: 'breads-and-sides', description: 'Warm naans, garlic knots, and shareable sides to round out any order.' } });
    await prisma.category.create({ data: { name: 'Chef\'s Tandoor Specials', slug: 'chefs-tandoor-specials', description: 'Clay-oven grilled meats and vegetables marinated in signature spice blends.' } });
    await prisma.category.create({ data: { name: 'Seasonal Chef Specials', slug: 'seasonal-chef-specials', description: 'Rotating dishes highlighting seasonal produce and Sam\'s Kitchen creativity.' } });
  } catch (e) { console.warn('[seed] Category skipped:', e); }
  try {
    await prisma.menuItem.create({ data: { name: 'Sichuan Garlic Noodles', description: 'Wok-tossed wheat noodles in a fiery garlic chili sauce with scallions.', price: 19.99, categoryId: 1, imageUrl: '/img/menu_items/sichuan-garlic-noodles.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Samosa Chaat Platter', description: 'Crushed samosas topped with chickpeas, yogurt, and tangy tamarind chutney.', price: 29.99, categoryId: 2, imageUrl: '/img/menu_items/samosa-chaat-platter.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Truffle Mushroom Risotto', description: 'Creamy arborio rice simmered with wild mushrooms and shaved truffle.', price: 39.99, categoryId: 3, imageUrl: '/img/menu_items/truffle-mushroom-risotto.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Roasted Tomato Basil Soup', description: 'Slow-roasted tomatoes blended with basil and a touch of cream.', price: 49.99, categoryId: 4, imageUrl: '/img/menu_items/roasted-tomato-basil-soup.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Pistachio Kulfi', description: 'Traditional Indian frozen dessert infused with cardamom and pistachios.', price: 59.99, categoryId: 5, imageUrl: '/img/menu_items/pistachio-kulfi.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Mango Lassi', description: 'Chilled yogurt drink blended with ripe mango and a hint of cardamom.', price: 69.99, categoryId: 6, imageUrl: '/img/menu_items/mango-lassi.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Vegan Chana Masala', description: 'Chickpeas simmered in a spiced tomato gravy, finished with fresh cilantro.', price: 79.99, categoryId: 7, imageUrl: '/img/menu_items/vegan-chana-masala.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Garlic Butter Naan', description: 'Tandoor-baked flatbread brushed with garlic butter and fresh herbs.', price: 89.99, categoryId: 8, imageUrl: '/img/menu_items/garlic-butter-naan.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Tandoori Chicken Skewers', description: 'Yogurt-marinated chicken grilled in a traditional clay tandoor oven.', price: 99.99, categoryId: 9, imageUrl: '/img/menu_items/tandoori-chicken-skewers.jpg', isSpecial: true, isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Butternut Squash Agnolotti', description: 'House-made pasta filled with roasted squash in a sage brown butter sauce.', price: 109.99, categoryId: 10, imageUrl: '/img/menu_items/butternut-squash-agnolotti.jpg', isSpecial: true, isAvailable: true } });
  } catch (e) { console.warn('[seed] MenuItem skipped:', e); }
  try {
    await prisma.order.create({ data: { userId: 1, status: 'active', totalAmount: 19.99, stripePaymentIntent: 'pi_3Nk29aLZvKYlo2C1gYt9FZc', stripeCheckoutSessionId: '1' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 29.99, stripePaymentIntent: 'pi_3Nm71bLZvKYlo2C1kTr3XAd', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 39.99, stripePaymentIntent: 'pi_3Np84cLZvKYlo2C1pQs7VBe', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 49.99, stripePaymentIntent: 'pi_3Nr93dLZvKYlo2C1zWe2YCf', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 59.99, stripePaymentIntent: 'pi_3Nt02eLZvKYlo2C1aRf4ZDg', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 69.99, stripePaymentIntent: 'pi_3Nv11fLZvKYlo2C1bTg5AEh', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 79.99, stripePaymentIntent: 'pi_3Nx22gLZvKYlo2C1cUh6BFi', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 89.99, stripePaymentIntent: 'pi_3Nz33hLZvKYlo2C1dVi7CGj', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 99.99, stripePaymentIntent: 'pi_3O144iLZvKYlo2C1eWj8DHk', stripeCheckoutSessionId: '2' } });
    await prisma.order.create({ data: { userId: 2, status: 'active', totalAmount: 109.99, stripePaymentIntent: 'pi_3O255jLZvKYlo2C1fXk9EIl', stripeCheckoutSessionId: '2' } });
  } catch (e) { console.warn('[seed] Order skipped:', e); }
  try {
    await prisma.orderItem.create({ data: { orderId: 1, menuItemId: 1, quantity: 10, price: 19.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 20, price: 29.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 30, price: 39.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 40, price: 49.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 50, price: 59.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 60, price: 69.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 70, price: 79.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 80, price: 89.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 90, price: 99.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 100, price: 109.99 } });
  } catch (e) { console.warn('[seed] OrderItem skipped:', e); }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
