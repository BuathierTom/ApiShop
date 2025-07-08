import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByUserId } from '../api/order';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
}

interface Order {
    id: string;
    userId: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    items: OrderItem[];
}

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const data = await getOrdersByUserId(user.id);
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <>
            <Header />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
                        </div>

                        <div className="mt-6 flow-root sm:mt-8">
                            {orders.length === 0 ? (
                                <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
                            ) : (
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {orders.map((order) => (
                                        <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6">
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                    #{order.id.substring(0, 8).toUpperCase()}
                                                </dd>
                                            </dl>
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </dd>
                                            </dl>
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                    {order.totalPrice.toFixed(2)} €
                                                </dd>
                                            </dl>
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                                <dd className="mt-1.5 text-sm font-semibold px-2.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                    {order.status}
                                                </dd>
                                            </dl>
                                            <div className="w-full sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                                <Link
                                                to={`/orders/${order.id}`}
                                                className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                                >
                                                View details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrdersPage;
