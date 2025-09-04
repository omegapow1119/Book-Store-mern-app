import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart, updateCartQuantity } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((acc, item) => {
        const qty = item.quantity || 1;
        return acc + item.newPrice * qty;
    }, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (product, newQty) => {
        if (newQty < 1) return;
        dispatch(updateCartQuantity({ productId: product._id, quantity: newQty }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-50 to-gray-100 max-[700px]:bg-gray-100">
            <div className="flex flex-col max-w-4xl mx-auto bg-white shadow-2xl rounded-lg my-8 min-[701px]:p-8 max-[700px]:min-h-screen max-[700px]:my-0">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900 font-primary max-[700px]:text-xl max-[700px]:font-bold">Shopping Cart</h2>
                        <div className="ml-3 flex h-7 items-center max-[700px]:ml-0">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="relative -m-2 py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 font-primary max-[700px]:py-1 max-[700px]:px-3 max-[700px]:bg-red-600 max-[700px]:rounded-lg max-[700px]:hover:bg-red-700 max-[700px]:hover:scale-105 max-[700px]:active:scale-95 max-[700px]:font-medium"
                            >
                                <span>Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-12">
                        {cartItems.length > 0 ? (
                            <ul role="list" className="space-y-6 max-[700px]:space-y-4">
                                {cartItems.map((product) => (
                                    <li
                                        key={product?._id}
                                        className="flex bg-white shadow-md rounded-lg p-4 min-[701px]:gap-6 max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-4 hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 max-[700px]:h-24 max-[700px]:w-24 max-[700px]:mx-auto">
                                            <img
                                                alt={product?.title}
                                                src={product?.coverImage}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col max-[700px]:items-center max-[700px]:text-center max-[700px]:gap-3">
                                            <div className="flex justify-between items-center text-lg font-semibold text-gray-900 font-primary max-[700px]:flex-col max-[700px]:gap-2">
                                                <h3 className="max-[700px]:text-base max-[700px]:sm:text-lg">
                                                    <Link to="/" className="hover:underline">{product?.title}</Link>
                                                </h3>
                                                <p className="text-xl font-bold text-gray-900 font-primary max-[700px]:text-lg">
                                                    ₹{(product?.newPrice * (product.quantity || 1)).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center mt-3 max-[700px]:flex-col max-[700px]:gap-3">
                                                <p className="text-sm text-gray-500 font-primary max-[700px]:text-gray-600 max-[700px]:font-medium">
                                                    <strong>Category: </strong>{product?.category}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleQuantityChange(product, (product.quantity || 1) - 1)}
                                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 font-primary transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-primary">{product.quantity || 1}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(product, (product.quantity || 1) + 1)}
                                                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 font-primary transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-4 max-[700px]:justify-center max-[700px]:mt-3">
                                                <button
                                                    onClick={() => handleRemoveFromCart(product)}
                                                    type="button"
                                                    className="font-medium text-teal-500 hover:text-teal-600 font-primary transition-colors max-[700px]:active:text-teal-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 font-primary text-center py-8 max-[700px]:p-4 max-[700px]:bg-gray-50 max-[700px]:rounded-lg">No products found!</p>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 max-[700px]:space-y-3">
                    <div className="flex justify-between text-base font-medium text-gray-900 font-primary max-[700px]:text-lg max-[700px]:font-semibold">
                        <p>Subtotal</p>
                        <p>₹{totalPrice}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 font-primary max-[700px]:text-gray-600">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-8 max-[700px]:mt-6 max-[700px]:flex max-[700px]:justify-center">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 font-primary max-[700px]:w-full max-[700px]:sm:w-auto max-[700px]:px-4 max-[700px]:py-2 max-[700px]:sm:px-6 max-[700px]:sm:py-3 max-[700px]:text-gray-100 max-[700px]:font-semibold max-[700px]:rounded-lg max-[700px]:shadow-sm max-[700px]:hover:scale-105 max-[700px]:active:scale-95 max-[700px]:active:bg-teal-700 max-[700px]:focus:outline-none max-[700px]:transition-all"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500 font-primary max-[700px]:text-xs max-[700px]:sm:text-sm max-[700px]:text-gray-600 max-[700px]:mt-4">
                        <Link to="/">
                            or
                            <button
                                type="button"
                                className="font-medium text-teal-500 hover:text-teal-600 ml-1 font-primary transition-colors max-[700px]:hover:underline max-[700px]:active:text-teal-700"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> →</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;