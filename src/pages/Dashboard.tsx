import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Truck, Package, TrendingUp, Clock, CalendarClock, MapPin, CreditCard, AlertCircle, Bell } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useTransportStore } from '../store/transportStore';

// Import these components if needed later

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { 
    getRequestsByFarmer, 
    getRequestsByTransporter,
    getAvailableRequests 
  } = useTransportStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  // Get relevant data based on user role
  const farmerRequests = user.role === 'farmer' ? getRequestsByFarmer(user.id) : [];
  const transporterRequests = user.role === 'transporter' ? getRequestsByTransporter(user.id) : [];
  const availableRequests = user.role === 'transporter' ? getAvailableRequests() : [];

  // Calculate statistics
  const pendingRequestsCount = farmerRequests.filter(req => req.status === 'pending').length;
  const inTransitRequestsCount = farmerRequests.filter(req => req.status === 'in-transit').length;
  const deliveredRequestsCount = farmerRequests.filter(req => req.status === 'delivered').length;

  const inTransitTransporterRequestsCount = transporterRequests.filter(req => req.status === 'in-transit').length;
  const deliveredTransporterRequestsCount = transporterRequests.filter(req => req.status === 'delivered').length;

  return (
    <Layout>
      <div className="bg-neutral-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">
              {t('common.dashboard')}
            </h1>
            <p className="text-neutral-600 mt-1">
              {user.role === 'farmer' 
                ? 'Manage your transport requests and track shipments' 
                : 'Manage transport jobs and your vehicle fleet'}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {user.role === 'farmer' ? (
              <>
                <Card className="bg-primary-50 border-l-4 border-primary-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                        <p className="text-2xl font-bold text-primary-900">{pendingRequestsCount}</p>
                      </div>
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Clock className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-secondary-50 border-l-4 border-secondary-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-secondary-700">In Transit</p>
                        <p className="text-2xl font-bold text-secondary-900">{inTransitRequestsCount}</p>
                      </div>
                      <div className="p-2 bg-secondary-100 rounded-full">
                        <Truck className="h-6 w-6 text-secondary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-success-light/10 border-l-4 border-success">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-success-dark">Delivered</p>
                        <p className="text-2xl font-bold text-success-DEFAULT">{deliveredRequestsCount}</p>
                      </div>
                      <div className="p-2 bg-success-light/20 rounded-full">
                        <Package className="h-6 w-6 text-success-DEFAULT" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-primary-50 border-l-4 border-primary-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-700">Available Jobs</p>
                        <p className="text-2xl font-bold text-primary-900">{availableRequests.length}</p>
                      </div>
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Package className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-secondary-50 border-l-4 border-secondary-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-secondary-700">Active Shipments</p>
                        <p className="text-2xl font-bold text-secondary-900">{inTransitTransporterRequestsCount}</p>
                      </div>
                      <div className="p-2 bg-secondary-100 rounded-full">
                        <Truck className="h-6 w-6 text-secondary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-success-light/10 border-l-4 border-success">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-success-dark">Completed Deliveries</p>
                        <p className="text-2xl font-bold text-success-DEFAULT">{deliveredTransporterRequestsCount}</p>
                      </div>
                      <div className="bg-success-light/10 rounded-full p-3">
                        <TrendingUp className="h-6 w-6 text-success-DEFAULT" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user.role === 'farmer' ? (
                <>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/request-transport')}
                  >
                    <Truck className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Request Transport</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/track-shipment')}
                  >
                    <MapPin className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Track Shipment</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/my-requests')}
                  >
                    <Package className="h-6 w-6 text-primary-600 mb-2" />
                    <span>My Requests</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/payments')}
                  >
                    <CreditCard className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Payments</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/available-requests')}
                  >
                    <Package className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Available Requests</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/active-shipments')}
                  >
                    <Truck className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Active Shipments</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/my-vehicles')}
                  >
                    <Truck className="h-6 w-6 text-primary-600 mb-2" />
                    <span>My Vehicles</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-24 border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    onClick={() => navigate('/earnings')}
                  >
                    <CreditCard className="h-6 w-6 text-primary-600 mb-2" />
                    <span>Earnings</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - Request activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.role === 'farmer' ? (
                    farmerRequests.length > 0 ? (
                      <div className="space-y-4">
                        {farmerRequests.slice(0, 5).map((request) => (
                          <div key={request.id} className="border rounded-md p-4 hover:bg-neutral-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{request.cargoType} ({request.cargoWeight} tons)</h3>
                                <div className="text-sm text-neutral-500 mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>From: {request.pickupLocation.address}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>To: {request.deliveryLocation.address}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-2">
                                  <CalendarClock className="h-4 w-4 mr-1 text-neutral-500" />
                                  <span className="text-sm text-neutral-500">
                                    Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`
                                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${request.status === 'pending' ? 'bg-neutral-100 text-neutral-800' : ''}
                                  ${request.status === 'accepted' ? 'bg-primary-100 text-primary-800' : ''}
                                  ${request.status === 'in-transit' ? 'bg-secondary-100 text-secondary-800' : ''}
                                  ${request.status === 'delivered' ? 'bg-success-light/10 text-success' : ''}
                                  ${request.status === 'cancelled' ? 'bg-error-light/10 text-error' : ''}
                                `}>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </span>
                                {request.price && (
                                  <span className="text-sm font-medium mt-2">
                                    {request.price} MAD
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/request/${request.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-700">No transport requests yet</h3>
                        <p className="text-neutral-500 mb-4">Start by creating a new transport request</p>
                        <Button 
                          variant="primary"
                          onClick={() => navigate('/request-transport')}
                        >
                          Request Transport
                        </Button>
                      </div>
                    )
                  ) : (
                    /* For transporters */
                    transporterRequests.length > 0 ? (
                      <div className="space-y-4">
                        {transporterRequests.slice(0, 5).map((request) => (
                          <div key={request.id} className="border rounded-md p-4 hover:bg-neutral-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{request.cargoType} ({request.cargoWeight} tons)</h3>
                                <div className="text-sm text-neutral-500 mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>From: {request.pickupLocation.address}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>To: {request.deliveryLocation.address}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-2">
                                  <CalendarClock className="h-4 w-4 mr-1 text-neutral-500" />
                                  <span className="text-sm text-neutral-500">
                                    Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`
                                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${request.status === 'pending' ? 'bg-neutral-100 text-neutral-800' : ''}
                                  ${request.status === 'accepted' ? 'bg-primary-100 text-primary-800' : ''}
                                  ${request.status === 'in-transit' ? 'bg-secondary-100 text-secondary-800' : ''}
                                  ${request.status === 'delivered' ? 'bg-success-light/10 text-success' : ''}
                                  ${request.status === 'cancelled' ? 'bg-error-light/10 text-error' : ''}
                                `}>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </span>
                                {request.price && (
                                  <span className="text-sm font-medium mt-2">
                                    {request.price} MAD
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/transport/${request.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Truck className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-700">No transport jobs yet</h3>
                        <p className="text-neutral-500 mb-4">Check available transport requests</p>
                        <Button 
                          variant="primary"
                          onClick={() => navigate('/available-requests')}
                        >
                          View Available Requests
                        </Button>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - Notifications, etc. */}
            <div>
              {/* Notifications */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-md">
                      <div className="mt-0.5">
                        <Bell className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Welcome to AgriMove</p>
                        <p className="text-xs text-neutral-500 mt-1">Explore the platform to get started</p>
                      </div>
                    </div>
                    
                    {user.role === 'farmer' && (
                      <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-md">
                        <div className="mt-0.5">
                          <Truck className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Create your first transport request</p>
                          <p className="text-xs text-neutral-500 mt-1">Connect with transport providers</p>
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'transporter' && (
                      <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-md">
                        <div className="mt-0.5">
                          <Package className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Check available transport requests</p>
                          <p className="text-xs text-neutral-500 mt-1">Find new business opportunities</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Tips or Help section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Tips & Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        <AlertCircle className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Complete your profile</p>
                        <p className="text-xs text-neutral-500 mt-1">Add more details to increase trust</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        <AlertCircle className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Explore the help center</p>
                        <p className="text-xs text-neutral-500 mt-1">Learn how to make the most of AgriMove</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 p-0 h-auto text-secondary-600 hover:text-secondary-700 hover:bg-transparent"
                          onClick={() => navigate('/help')}
                        >
                          View help articles
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;