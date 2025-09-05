import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthLayout from '../layouts/AuthLayout';
import CartPage from '../pages/books/CartPage';
import CheckoutPage from '../pages/books/CheckoutPage';
import SingleBook from '../pages/books/SingleBook';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../context/AuthContext';
import OrderPage from '../pages/books/OrderPage';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout.jsx';
import AdminRoute from './AdminRoute';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import ManageBooks from '../pages/dashboard/ManageBooks/ManageBooks.jsx';
import AddBook from '../pages/dashboard/addBook/AddBook.jsx';
import UpdateBook from '../pages/dashboard/EditBook/UpdateBook.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>,
      },
      {
        path: '/books/:id',
        element: <SingleBook />,
      },
      {
        path: '/orders',
        element: <PrivateRoute>
          <OrderPage />
        </PrivateRoute>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute>
      <DashboardLayout />
    </AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute>
          <Dashboard />
        </AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute>
          <AddBook />
        </AdminRoute>
      },
      {
        path: "edit-book/:id",
        element: <AdminRoute>
          <UpdateBook />
        </AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute>
          <ManageBooks />
        </AdminRoute>
      }
    ]
  },
]);

export default router;