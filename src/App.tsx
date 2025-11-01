import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import RequestTransport from './pages/RequestTransport';
import TrackShipment from './pages/TrackShipment';
import HowItWorksFarmers from './pages/HowItWorksFarmers';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import MyVehicles from './pages/my-vehicles';
import Earnings from './pages/earnings';
import AvailableRequests from './pages/available-requests';
import ActiveShipments from './pages/active-shipments';
import Pricing from './pages/pricing';
import MyRequests from './pages/my-requests';
import DemoInfo from './pages/DemoInfo';
import Services from './pages/Services';
import RoutesPage from './pages/Routes';
import Marketplace from './pages/Marketplace';

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'farmer' | 'transporter' | 'store' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Farmer-specific routes */}
      <Route 
        path="/request-transport" 
        element={
          <ProtectedRoute requiredRole="farmer">
            <RequestTransport />
          </ProtectedRoute>
        } 
        
      />
      <Route path="/track-shipment" element={<TrackShipment />} />
      <Route path="/how-it-works-farmers" element={<HowItWorksFarmers />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-vehicles" element={<MyVehicles />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/available-requests" element={<AvailableRequests />} />
      <Route path="/active-shipments" element={<ActiveShipments />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/demo-info" element={<DemoInfo />} />
      <Route path="/services" element={<Services />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/marketplace" element={<Marketplace />} />
      
      {/* Transporter-specific routes */}
     

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/\" replace />} />
    </Routes>
  );
}
export default App;