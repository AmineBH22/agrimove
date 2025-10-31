import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDemoDataStore } from '../store/demoDataStore';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const DemoInfo: React.FC = () => {
  const navigate = useNavigate();
  const { farmers, transporters, stores, vehicles, marketplaceListings } = useDemoDataStore();

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-100 min-h-screen">
      {/* Go Back Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft size={16} />}
        >
          Go Back
        </Button>
      </div>

      <div className="text-center mb-8">
        <Logo size="xl" showText={false} className="mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-primary-800">
          AgriMove Demo Data Overview
        </h1>
        <p className="text-primary-600 mt-2">Comprehensive demo data for testing the platform</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Login Accounts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-primary-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-primary-800 flex items-center gap-2">
            🔑 Quick Login Accounts
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="font-semibold text-green-800">Farmer Account</p>
              <p className="text-sm text-green-600">Email: farmer@demo.com</p>
              <p className="text-sm text-green-600">Password: password</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-800">Transport Agency</p>
              <p className="text-sm text-blue-600">Email: transport@demo.com</p>
              <p className="text-sm text-blue-600">Password: password</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-semibold text-purple-800">Store/Client</p>
              <p className="text-sm text-purple-600">Email: store@demo.com</p>
              <p className="text-sm text-purple-600">Password: password</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-secondary-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-secondary-800 flex items-center gap-2">
            📊 Demo Data Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">{farmers.length}</div>
              <div className="text-sm text-green-600">Farmers</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">{transporters.length}</div>
              <div className="text-sm text-blue-600">Transport Agencies</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">{stores.length}</div>
              <div className="text-sm text-purple-600">Stores/Clients</div>
            </div>
            <div className="text-center p-3 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-800">{vehicles.length}</div>
              <div className="text-sm text-primary-600">Vehicles</div>
            </div>
          </div>
          <div className="mt-4 text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-2xl font-bold text-secondary-800">{marketplaceListings.length}</div>
            <div className="text-sm text-secondary-600">Marketplace Listings</div>
          </div>
        </div>
      </div>

      {/* Farmers Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center gap-2">
          🌾 Demo Farmers ({farmers.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-green-200 hover:border-green-400 transition">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={farmer.avatar} 
                  alt={farmer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-green-800">{farmer.name}</h3>
                  <p className="text-sm text-green-600">{farmer.farmName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">📍 {farmer.address}</p>
              <p className="text-sm text-gray-600 mb-2">📧 {farmer.email}</p>
              <p className="text-sm text-gray-600 mb-2">📱 {farmer.phoneNumber}</p>
              <div className="mt-3">
                <p className="text-xs font-semibold text-green-700 mb-1">Crops:</p>
                <div className="flex flex-wrap gap-1">
                  {farmer.cropTypes?.map((crop, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold">{farmer.ratings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Agencies Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
          🚛 Demo Transport Agencies ({transporters.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transporters.map((transporter) => (
            <div key={transporter.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-200 hover:border-blue-400 transition">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={transporter.avatar} 
                  alt={transporter.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-blue-800">{transporter.name}</h3>
                  <p className="text-sm text-blue-600">{transporter.companyName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">📍 {transporter.address}</p>
              <p className="text-sm text-gray-600 mb-2">📧 {transporter.email}</p>
              <p className="text-sm text-gray-600 mb-2">📱 {transporter.phoneNumber}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold">{transporter.ratings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stores Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          🏪 Demo Stores/Clients ({stores.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-purple-200 hover:border-purple-400 transition">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={store.avatar} 
                  alt={store.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-purple-800">{store.name}</h3>
                  <p className="text-sm text-purple-600">{store.storeName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">🏢 {store.storeType}</p>
              <p className="text-sm text-gray-600 mb-2">📍 {store.address}</p>
              <p className="text-sm text-gray-600 mb-2">📧 {store.email}</p>
              <p className="text-sm text-gray-600 mb-2">📱 {store.phoneNumber}</p>
              <div className="mt-3">
                <p className="text-xs font-semibold text-purple-700 mb-1">Preferred Products:</p>
                <div className="flex flex-wrap gap-1">
                  {store.preferredProducts?.map((product, index) => (
                    <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold">{store.ratings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-yellow-800 flex items-center gap-2">
          🚐 Demo Vehicles ({vehicles.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-yellow-200 hover:border-yellow-400 transition">
              <h3 className="font-bold text-yellow-800 mb-2">{vehicle.type.toUpperCase()}</h3>
              <p className="text-sm text-gray-600 mb-1">🚗 {vehicle.licensePlate}</p>
              <p className="text-sm text-gray-600 mb-1">⚖️ Capacity: {vehicle.capacity} tons</p>
              <p className="text-sm text-gray-600 mb-1">❄️ Refrigerated: {vehicle.isRefrigerated ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600 mb-1">📍 {vehicle.currentLocation?.address}</p>
              <div className="mt-3">
                <p className="text-xs font-semibold text-yellow-700 mb-1">Driver:</p>
                <p className="text-sm text-gray-600">{vehicle.driver?.name}</p>
                <p className="text-sm text-gray-600">{vehicle.driver?.phoneNumber}</p>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  vehicle.isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.isAvailable ? 'Available' : 'Busy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Listings Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-secondary-800 flex items-center gap-2">
          Demo Marketplace Listings ({marketplaceListings.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-secondary-200 hover:border-secondary-400 transition">
              {listing.photos && listing.photos.length > 0 && (
                <img 
                  src={listing.photos[0]} 
                  alt={listing.typeOfGood}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="font-bold text-secondary-800 mb-2">{listing.typeOfGood}</h3>
              <p className="text-sm text-gray-600 mb-1">📦 {listing.quantity} {listing.unit}</p>
              <p className="text-sm text-gray-600 mb-1">🏷️ {listing.condition}</p>
              <p className="text-sm text-gray-600 mb-1">⭐ {listing.quality}</p>
              <p className="text-sm text-gray-600 mb-1">📍 {listing.location}</p>
              <p className="text-lg font-bold text-secondary-800 mb-2">{listing.pricePerUnit} MAD/{listing.unit}</p>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  listing.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : listing.status === 'sold'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {listing.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-8">
        <p className="text-gray-600">
          This demo contains comprehensive data to showcase the AgriMove platform capabilities.
          <br />
          Use the quick login accounts above to explore different user perspectives.
        </p>
      </div>
    </div>
  );
};

export default DemoInfo;
