import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import OrderList from './Pages/OrderList';
import Dashboard from './Pages/Dashboard';

import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgetPassword';
import ResetPassword from './Auth/ResetPassword';
import TwoFactor from './Auth/TwoFactor';

import EditProduct from './Pages/EditProduct';
import OrderDetails from './Pages/OrderDetails';
import ReturnRequestList from './Pages/ReturnRequestList';
import ReturnDetails from './Pages/ReturnDetails';

import CustomerList from './Pages/CustomerList';
import CustomerProfile from './Pages/CustomerProfile';

import SupportList from './Pages/SupportList';
import SupportDetails from './Pages/SupportDetails';

import AddCoupon from './Pages/AddCoupon';
import CouponList from './Pages/CouponList';
import EditCoupon from './Pages/EditCoupon';
import FlashSale from './Pages/FlashSale';

import Payments from './Pages/Payments';
import Banners from './Pages/Banners';
import BannersDisplay from './Pages/BannersDisplay';
import SliderUpload from './Pages/SliderUpload';
import FeaturedProducts from './Pages/FeaturedProducts';
import BestSellers from './Pages/BestSellers';
import BlogPost from './Pages/BlogPost';
import SeoSettings from './Pages/SeoSettings';
import StaticPagesManager from './Pages/StaticPagesManager';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="two-factor" element={<TwoFactor />} />

      {/* Protected Admin Routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="returns" element={<ReturnRequestList />} />
        <Route path="returns/:id" element={<ReturnDetails />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:email" element={<CustomerProfile />} />
        <Route path="support" element={<SupportList />} />
        <Route path="support/:id" element={<SupportDetails />} />
        <Route path="coupons" element={<CouponList />} />
        <Route path="coupons/add" element={<AddCoupon />} />
        <Route path="coupons/edit/:couponId" element={<EditCoupon />} />
        <Route path="flashsale" element={<FlashSale />} />
        <Route path="payments" element={<Payments />} />
        <Route path="banners" element={<Banners />} />
        <Route path="bannersdisplay" element={<BannersDisplay />} />
        <Route path="slider" element={<SliderUpload />} />
        <Route path="FeaturedProducts" element={<FeaturedProducts />} />
        <Route path="BlogPost" element={<BlogPost />} />
        <Route path="SeoSettings" element={<SeoSettings />} />
        <Route path="StaticPagesManager" element={<StaticPagesManager />} />
        <Route path="Bestsellers" element={<BestSellers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
