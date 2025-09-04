import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

// Load initial state from local storage
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
};
 
// Save state to local storage
const saveCartToLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                Swal.fire({
                    position: "top",
                    toast: true,
                    icon: "success",
                    title: "Product Added to Cart",
                    showConfirmButton: false,
                    timer: 1000,
                    width: "300px"
                });
            } else {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
                Swal.fire({
                    position: "top",
                    toast: true,
                    icon: "warning",
                    title: "Already Added to Cart",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "300px"
                });
            }
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            saveCartToLocalStorage(state);
        },
        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cartItems.find((item) => item._id === productId);
            if (item) {
                item.quantity = quantity;
            }
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;