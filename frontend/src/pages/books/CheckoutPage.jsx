import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/orders.Api';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * (item.quantity || 1), 0).toFixed(2);
    const { currentUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const navigate =  useNavigate()

    const [isChecked, setIsChecked] = useState(false)

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                Pincode: data.Pincode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        }


        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#14b8a6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error placing an order", error);
            alert("Failed to place an order");
        }
    }

    if(isLoading) {
        return <div>Loading...</div>
    }
    return (
        <section>
            <div className="min-h-screen bg-gradient-to-r from-teal-50 to-gray-100 max-[700px]:bg-gray-100 py-12 px-4">
                <div className="container max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 font-primary max-[700px]:text-xl">Cash On Delivery</h2>
                            <p className="text-gray-600 mt-2 font-primary">Total Price: ₹{totalPrice}</p>
                            <p className="text-gray-600 mt-1 font-primary">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                        </div>

                        <div className="text-gray-600 mb-6">
                            <p className="text-lg font-medium font-primary">Personal Details</p>
                            <p className="text-sm font-primary">Please fill out all the fields.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-3">
                                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="name" className="block text-gray-700 font-primary font-medium">Full Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 font-primary">Full name is required</p>}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="email" className="block text-gray-700 font-primary font-medium">Email Address</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-100 text-gray-500 cursor-not-allowed font-primary"
                                            disabled
                                            defaultValue={currentUser?.email}
                                            placeholder="email@domain.com"
                                        />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="phone" className="block text-gray-700 font-primary font-medium">Phone Number</label>
                                        <input
                                            {...register("phone", { required: true })}
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                            placeholder="+91 123 456 7890"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-primary">Phone number is required</p>}
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="address" className="block text-gray-700 font-primary font-medium">Address / Street</label>
                                        <input
                                            {...register("address", { required: true })}
                                            type="text"
                                            name="address"
                                            id="address"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                            placeholder="Enter your address"
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1 font-primary">Address is required</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="city" className="block text-gray-700 font-primary font-medium">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                            placeholder="Enter your city"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1 font-primary">City is required</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="country" className="block text-gray-700 font-primary font-medium">Country / Region</label>
                                        <input
                                            {...register("country", { required: true })}
                                            name="country"
                                            id="country"
                                            placeholder="Enter your country"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                        />

                                        {errors.country && <p className="text-red-500 text-xs mt-1 font-primary">Country is required</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="state" className="block text-gray-700 font-primary font-medium">State / Province</label>
                                        <input
                                            {...register("state", { required: true })}
                                            name="state"
                                            id="state"
                                            placeholder="Enter your state"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                        />
                                        {errors.state && <p className="text-red-500 text-xs mt-1 font-primary">State is required</p>}
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="Pincode" className="block text-gray-700 font-primary font-medium">Pincode</label>
                                        <input
                                            {...register("Pincode", { required: true })}
                                            type="text"
                                            name="Pincode"
                                            id="Pincode"
                                            className="h-10 border border-gray-300 mt-1 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
                                            placeholder="12345"
                                        />
                                        {errors.Pincode && <p className="text-red-500 text-xs mt-1 font-primary">Pincode is required</p>}
                                    </div>

                                    <div className="md:col-span-5 mt-4">
                                        <div className="inline-flex items-center">
                                            <input
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                type="checkbox"
                                                name="billing_same"
                                                id="billing_same"
                                                className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                                            />
                                            <label htmlFor="billing_same" className="ml-2 text-gray-700 font-primary">
                                                I agree to the{' '}
                                                <Link className="text-teal-500 hover:text-teal-600 underline underline-offset-2 transition-colors">
                                                    Terms & Conditions
                                                </Link>{' '}
                                                and{' '}
                                                <Link className="text-teal-500 hover:text-teal-600 underline underline-offset-2 transition-colors">
                                                    Shopping Policy
                                                </Link>.
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right mt-6">
                                        <button
                                            disabled={!isChecked}
                                            className="bg-teal-500 text-white font-primary font-medium py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed max-[700px]:w-full max-[700px]:py-3"
                                        >
                                            Place an Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage