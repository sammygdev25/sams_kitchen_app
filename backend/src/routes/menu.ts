import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, hyphen-separated'),
  description: z.string().optional().default(''),
});

const createMenuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional().default(''),
  price: z.number().nonnegative(),
  categoryId: z.number().int().positive(),
  imageUrl: z.string().url().optional().or(z.literal('')).default(''),
  isSpecial: z.boolean().optional().default(false),
  isAvailable: z.boolean().optional().default(true),
});

const menuItemsQuerySchema = z.object({
  category: z.string().min(1).max(120).optional(),
  special: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
  available: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// GET /api/categories/
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('[Menu] Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/:id
router.get('/categories/:id', async (req: Request, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({ error: 'Invalid id', code: 'validation_error', issues: parsedParams.error.issues });
  }
  try {
    const category = await prisma.category.findUnique({
      where: { id: parsedParams.data.id },
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('[Menu] Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// POST /api/categories/ (authenticated)
router.post('/categories', authMiddleware, async (req: AuthRequest, res: Response) => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', code: 'validation_error', issues: parsed.error.issues });
  }
  try {
    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error('[Menu] Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// GET /api/menu-items/ — browse noodles dinner specials, Indian appetizers and Italian mains
router.get('/menu-items', async (req: Request, res: Response) => {
  const parsedQuery = menuItemsQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({ error: 'Invalid query', code: 'validation_error', issues: parsedQuery.error.issues });
  }
  try {
    const { category, special, available } = parsedQuery.data;

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = { slug: category };
    }
    if (special !== undefined) {
      where.isSpecial = special;
    }
    if (available !== undefined) {
      where.isAvailable = available;
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      include: { category: true },
      orderBy: [{ category: { name: 'asc' } }, { name: 'asc' }],
    });
    res.json(menuItems);
  } catch (error) {
    console.error('[Menu] Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET /api/menu-items/:id
router.get('/menu-items/:id', async (req: Request, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({ error: 'Invalid id', code: 'validation_error', issues: parsedParams.error.issues });
  }
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parsedParams.data.id },
      include: { category: true },
    });
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('[Menu] Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// POST /api/menu-items/ (authenticated)
router.post('/menu-items', authMiddleware, async (req: AuthRequest, res: Response) => {
  const parsed = createMenuItemSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', code: 'validation_error', issues: parsed.error.issues });
  }
  try {
    const category = await prisma.category.findUnique({ where: { id: parsed.data.categoryId } });
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
        price: parsed.data.price,
        categoryId: parsed.data.categoryId,
        imageUrl: parsed.data.imageUrl,
        isSpecial: parsed.data.isSpecial,
        isAvailable: parsed.data.isAvailable,
      },
      include: { category: true },
    });
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('[Menu] Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

export default router;