// src/routes.js
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomeLayout from './components/layout/HomeLayout';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/user/Dashboard';
import Users from './pages/user/Users';
import Settings from './pages/user/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },     
    ],
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: "home", element: <Dashboard /> },
      { path: 'users', element: <Users /> }, 
      { path: 'settings', element: <Settings /> }, 
    ],
  },
]);

export default router;
