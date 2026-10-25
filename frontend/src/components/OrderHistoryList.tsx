import type { Order } from '../types';
import {
  Card,
  CardBody,
  CardTitle,
  CardMeta,
  CardFooter,
  Price,
  EmptyState,
  Button,
  Stack,
} from './ui';
import OrderStatusBadge from './OrderStatusBadge';
import { Icon } from '../components/icons';

interface OrderHistoryListProps {
  orders: Order[];
}

export default function OrderHistoryList({ orders }: OrderHistoryListProps) {
  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No orders yet"
        text="Noodles, Indian appetizers and Italian mains from Sam's Kitchen will show up here once you place your first order."
        action={<Button to="/menu-items">Browse the menu</Button>}
      />
    );
  }

  return (
    <Stack gap="md">
      {orders.map((order) => {
        const itemCount =
          order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

        return (
          <Card key={order.id}>
            <CardBody>
              <div className="ds-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardMeta>
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {' · '}
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </CardMeta>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              {order.items && order.items.length > 0 && (
                <Stack gap="xs" className="ds-small ds-muted">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}× {item.menuItem?.name ?? 'Menu item'}
                    </div>
                  ))}
                </Stack>
              )}
            </CardBody>
            <CardFooter>
              <Price value={order.totalAmount} />
              <Button
                to={`/order-confirmation/${order.id}`}
                variant="ghost"
              >
                View details <Icon name="arrow-right" size={16} />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </Stack>
  );
}
