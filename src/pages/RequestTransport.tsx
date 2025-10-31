import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Calendar, MapPin, Thermometer, ClipboardList, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useAuthStore } from '../store/authStore';
import { useTransportStore } from '../store/transportStore';

const RequestTransport: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { createTransportRequest, isLoading, error } = useTransportStore();

  // Redirect if not authenticated or not a farmer
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'farmer') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Form steps
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState('');

  // Form data
  const [cargoType, setCargoType] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [requiresRefrigeration, setRequiresRefrigeration] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState({ latitude: 31.6295, longitude: -7.9811 });
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryCoordinates, setDeliveryCoordinates] = useState({ latitude: 33.5731, longitude: -7.5898 });
  const [notes, setNotes] = useState('');

  // Cargo type options
  const cargoOptions = [
    { value: '', label: 'Select cargo type' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'meat', label: 'Meat Products' },
    { value: 'seedlings', label: 'Seedlings/Plants' },
    { value: 'fertilizer', label: 'Fertilizer' },
    { value: 'equipment', label: 'Agricultural Equipment' },
    { value: 'other', label: 'Other' },
  ];

  const nextStep = () => {
    setFormError('');

    if (step === 1) {
      if (!cargoType) {
        setFormError('Please select a cargo type');
        return;
      }
      if (!cargoWeight || parseFloat(cargoWeight) <= 0) {
        setFormError('Please enter a valid cargo weight');
        return;
      }
    } else if (step === 2) {
      if (!pickupDate) {
        setFormError('Please select a pickup date');
        return;
      }
      
      const selectedDate = new Date(pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setFormError('Pickup date cannot be in the past');
        return;
      }
    } else if (step === 3) {
      if (!pickupLocation) {
        setFormError('Please enter a pickup location');
        return;
      }
      if (!deliveryLocation) {
        setFormError('Please enter a delivery location');
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!notes) {
      setNotes('No additional notes');
    }

    try {
      if (!user) return;
      
      await createTransportRequest({
        farmerId: user.id,
        cargoType,
        cargoWeight: parseFloat(cargoWeight),
        requiresRefrigeration,
        pickupDate: new Date(pickupDate),
        pickupLocation: {
          ...pickupCoordinates,
          address: pickupLocation,
        },
        deliveryLocation: {
          ...deliveryCoordinates,
          address: deliveryLocation,
        },
        notes,
      });

      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('An error occurred while creating the transport request');
      }
    }
  };

  // Show loading if user data isn't available yet
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="bg-neutral-50 py-8 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">
              {t('farmer.requestTransport')}
            </h1>
            <p className="text-neutral-600 mt-1">
              Fill in the details to create a new transport request
            </p>
          </div>

          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  1
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 1 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Cargo Details
                </div>
              </div>
              
              <div className={`flex-1 border-t mx-4 ${
                step >= 2 ? 'border-primary-600' : 'border-neutral-200'
              }`} />
              
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  2
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 2 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Schedule
                </div>
              </div>
              
              <div className={`flex-1 border-t mx-4 ${
                step >= 3 ? 'border-primary-600' : 'border-neutral-200'
              }`} />
              
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  3
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 3 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Locations
                </div>
              </div>
              
              <div className={`flex-1 border-t mx-4 ${
                step >= 4 ? 'border-primary-600' : 'border-neutral-200'
              }`} />
              
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 4 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  4
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step >= 4 ? 'text-primary-600' : 'text-neutral-500'
                }`}>
                  Confirm
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Cargo Details'}
                {step === 2 && 'Schedule Pickup'}
                {step === 3 && 'Pickup & Delivery Locations'}
                {step === 4 && 'Confirm Request'}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {(error || formError) && (
                <div className="mb-6 bg-error-light/10 text-error-DEFAULT p-3 rounded-md text-sm">
                  {formError || error}
                </div>
              )}
              
              {/* Step 1: Cargo Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <Select
                    label={t('farmer.cargoType')}
                    id="cargoType"
                    options={cargoOptions}
                    value={cargoType}
                    onChange={(value) => setCargoType(value)}
                    fullWidth
                    required
                  />
                  
                  <Input
                    label={t('farmer.cargoWeight')}
                    type="number"
                    id="cargoWeight"
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(e.target.value)}
                    placeholder="0.0"
                    min="0.1"
                    step="0.1"
                    leftIcon={<Package className="h-5 w-5" />}
                    helperText="Enter the weight in tons"
                    fullWidth
                    required
                  />
                  
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        checked={requiresRefrigeration}
                        onChange={(e) => setRequiresRefrigeration(e.target.checked)}
                      />
                      <span className="text-sm font-medium text-neutral-700">
                        {t('farmer.refrigeration')}
                      </span>
                      <Thermometer className="h-4 w-4 text-neutral-500" />
                    </label>
                    <p className="text-sm text-neutral-500 mt-1 ml-6">
                      Check this if your cargo needs temperature-controlled transportation
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 2: Schedule */}
              {step === 2 && (
                <div className="space-y-6">
                  <Input
                    label={t('farmer.pickupDate')}
                    type="datetime-local"
                    id="pickupDate"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    leftIcon={<Calendar className="h-5 w-5" />}
                    helperText="Select the date and time for pickup"
                    fullWidth
                    required
                  />
                  
                  <div className="p-4 bg-primary-50 rounded-md">
                    <p className="text-sm text-primary-700">
                      <strong>Note:</strong> Please schedule pickups at least 24 hours in advance to allow transporters time to plan their routes.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 3: Locations */}
              {step === 3 && (
                <div className="space-y-6">
                  <Input
                    label={t('farmer.pickupLocation')}
                    type="text"
                    id="pickupLocation"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address"
                    leftIcon={<MapPin className="h-5 w-5" />}
                    fullWidth
                    required
                  />
                  
                  {/* In a real app, this would be a map component for selecting location */}
                  <div className="p-4 bg-neutral-100 rounded-md text-center">
                    Map component for selecting pickup location would go here
                  </div>
                  
                  <Input
                    label={t('farmer.deliveryLocation')}
                    type="text"
                    id="deliveryLocation"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Enter delivery address"
                    leftIcon={<MapPin className="h-5 w-5" />}
                    fullWidth
                    required
                  />
                  
                  {/* In a real app, this would be a map component for selecting location */}
                  <div className="p-4 bg-neutral-100 rounded-md text-center">
                    Map component for selecting delivery location would go here
                  </div>
                </div>
              )}
              
              {/* Step 4: Confirm */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-neutral-50 rounded-md">
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">Request Summary</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Cargo Type</p>
                        <p className="text-neutral-900">{cargoType}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Weight</p>
                        <p className="text-neutral-900">{cargoWeight} tons</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Refrigeration</p>
                        <p className="text-neutral-900">{requiresRefrigeration ? 'Yes' : 'No'}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Pickup Date</p>
                        <p className="text-neutral-900">{new Date(pickupDate).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Pickup Location</p>
                        <p className="text-neutral-900">{pickupLocation}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-neutral-500">Delivery Location</p>
                        <p className="text-neutral-900">{deliveryLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Input
                    label={t('farmer.notes')}
                    type="textarea"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements or additional information"
                    leftIcon={<ClipboardList className="h-5 w-5" />}
                    fullWidth
                    containerClassName="h-32"
                    className="h-24"
                  />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  icon={<ArrowLeft className="h-4 w-4" />}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >
                  Submit Request
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RequestTransport;