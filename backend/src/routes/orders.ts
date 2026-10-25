import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const orderItemSchema = z.object({
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// GET /api/orders/ (authenticated) — order history for the current user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error('[Orders] Error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id (authenticated) — single order for confirmation / detail view
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({ error: 'Invalid order id', code: 'validation_error', issues: parsedParams.error.issues });
  }
  try {
    const order = await prisma.order.findUnique({
      where: { id: parsedParams.data.id },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.userId) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('[Orders] Error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /api/orders/ (authenticated) — place a new order (noodles specials, Indian appetizers, Italian mains, etc.)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', code: 'validation_error', issues: parsed.error.issues });
  }

  try {
    const menuItemIds = parsed.data.items.map((item) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    if (menuItems.length !== new Set(menuItemIds).size) {
      return res.status(400).json({ error: 'One or more menu items do not exist' });
    }

    const unavailable = menuItems.find((mi) => !mi.isAvailable);
    if (unavailable) {
      return res.status(400).json({ error: `${unavailable.name} is currently unavailable` });
    }

    const menuItemMap = new Map(menuItems.map((mi) => [mi.id, mi]));

    let totalAmount = 0;
    const itemsToCreate = parsed.data.items.map((item) => {
      const menuItem = menuItemMap.get(item.menuItemId)!;
      const price = Number(menuItem.price);
      totalAmount += price * item.quantity;
      return {
        menuItemId: menuItem.id,
        quantity: item.quantity,
        price,
      };
    });

    const order = await prisma.order.create({
      data: {
        userId: req.userId!,
        status: 'pending',
        totalAmount,
        stripePaymentIntent: '',
        stripeCheckoutSessionId: '',
        items: {
          create: itemsToCreate,
        },
      },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('[Orders] Error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;
