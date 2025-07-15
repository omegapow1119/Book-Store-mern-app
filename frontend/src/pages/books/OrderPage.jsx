import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/orders.Api';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-700 text-lg font-primary">Loading orders...</p> 
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-red-500 text-lg font-primary">Error getting orders data</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-4 py-6 font-primary">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Your Orders</h2>
            {orders.length === 0 ? (
                <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 text-center">
                    <p className="text-gray-700 font-primary">No orders found!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all" 
                            aria-label={`Order ₹{index + 1}`} 
                        >
                            <p className="p-1 bg-teal-500 text-gray-100 w-12 rounded mb-4 font-primary">
                                # {index + 1}
                            </p>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                                Order ID: {order._id}
                            </h3>
                            <p className="text-gray-600 mb-1 font-primary">Name: {order.name}</p>
                            <p className="text-gray-600 mb-1 font-primary">Email: {order.email}</p>
                            <p className="text-gray-600 mb-1 font-primary">Phone: {order.phone}</p>
                            <p className="text-gray-600 mb-4 font-primary">
                                Total Price: ₹{order.totalPrice.toFixed(2)} 
                            </p>
                            <h4 className="text-md font-semibold text-gray-900 mt-4 mb-2 font-primary">Address:</h4>
                            <p className="text-gray-600 font-primary">
                                {order.address.city}, {order.address.state}, {order.address.country},{' '}
                                {order.address.Pincode}
                            </p>
                            <h4 className="text-md font-semibold text-gray-900 mt-4 mb-2 font-primary">
                                Product IDs:
                            </h4>
                            <ul className="list-disc pl-5">
                                {order.productIds.map((productId) => (
                                    <li key={productId} className="text-gray-600 font-primary">
                                        {productId}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;