import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { MapPin, Search, Truck, Clock } from 'lucide-react';

// TODO: Move this to environment variables
const GOOGLE_MAPS_API_KEY = 'AIzaSyDOyDe5AwRbIBO2cWew0MzKM2XP8Rps98I';

interface DeliveryLocation {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'in-transit' | 'delivered' | 'pending';
  estimatedArrival: string;
  currentLocation: string;
}

// Mock data - Replace with actual API calls
const mockDeliveryData: DeliveryLocation = {
  id: 'DEL123',
  location: {
    lat: 31.7917,  // Morocco's approximate center
    lng: -7.0926
  },
  status: 'in-transit',
  estimatedArrival: '2025-10-15T15:30:00',
  currentLocation: 'Casablanca, Morocco'
};

const RoutesPage: React.FC = () => {
  const [deliveryId, setDeliveryId] = useState('');
  const [deliveryData, setDeliveryData] = useState<DeliveryLocation | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<DeliveryLocation | null>(null);
  const [error, setError] = useState('');

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = {
    lat: 31.7917,  // Morocco's center
    lng: -7.0926
  };

  const handleSearch = () => {
    if (!deliveryId.trim()) {
      setError('Please enter a delivery ID');
      return;
    }

    // Simulate API call - Replace with actual API call
    if (deliveryId === mockDeliveryData.id) {
      setDeliveryData(mockDeliveryData);
      setError('');
    } else {
      setError('Delivery not found');
      setDeliveryData(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-agri-dark mb-8">
            Track Your Delivery
          </h1>

          {/* Search Section */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  value={deliveryId}
                  onChange={(e) => setDeliveryId(e.target.value)}
                  placeholder="Enter delivery ID (e.g., DEL123)"
                  icon={<Search className="w-5 h-5 text-gray-400" />}
                />
              </div>
              <Button
                variant="primary"
                onClick={handleSearch}
                className="md:w-auto"
              >
                Track Delivery
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-error-DEFAULT text-sm">{error}</p>
            )}
          </Card>

          {/* Delivery Info */}
          {deliveryData && (
            <Card className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-agri-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold capitalize">{deliveryData.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-agri-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Current Location</p>
                    <p className="font-semibold">{deliveryData.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-agri-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Arrival</p>
                    <p className="font-semibold">
                      {formatDate(deliveryData.estimatedArrival)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Map Section */}
          <Card>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={deliveryData?.location || center}
                zoom={deliveryData ? 12 : 6}
              >
                {deliveryData && (
                  <Marker
                    position={deliveryData.location}
                    onClick={() => setSelectedMarker(deliveryData)}
                    icon={{
                      url: '/truck-icon.png',  // Add a truck icon to your public folder
                      scaledSize: new window.google.maps.Size(40, 40)
                    }}
                  />
                )}

                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker.location}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      <p className="font-semibold mb-1">Delivery {selectedMarker.id}</p>
                      <p className="text-sm text-gray-600">Status: {selectedMarker.status}</p>
                      <p className="text-sm text-gray-600">
                        ETA: {formatDate(selectedMarker.estimatedArrival)}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RoutesPage;