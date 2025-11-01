import React, { useState, useEffect } from "react";
import { Leaf, Star, DollarSign, Calendar, Truck } from 'lucide-react';
import { useMarketplaceStore } from "../store/marketplaceStore";
import { useAuthStore } from "../store/authStore";
import { MarketplaceListing } from "../types";
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import  Select  from '../components/ui/Select';
import  Layout  from '../components/layout/Layout';
import ImageUpload from '../components/ui/ImageUpload';

const GOOD_TYPES = ["Oranges", "Strawberries", "Lemons", "Potatoes", "Clementines", "Tomatoes", "Peppers", "Herbs", "Olives", "Other"];
const CONDITIONS = ["Fresh", "Frozen", "Organic", "Conventional"];
const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'grains', label: 'Grains' },
  { value: 'dairy', label: 'Dairy Products' },
  { value: 'meat', label: 'Meat & Poultry' },
  { value: 'other', label: 'Other' }
];

const AddGoodForm = ({
  onSubmit,
  form,
  handleInputChange,
  handleImagesSelected,
  handleToggleChange,
  errors,
  onClose,
}: {
  onSubmit: (e: React.FormEvent) => void;
  form: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleImagesSelected: (images: string[]) => void;
  handleToggleChange: (name: string) => void;
  errors: { [key: string]: string };
  onClose: () => void;
}) => (
  <form onSubmit={onSubmit}>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Product Images</label>
      <ImageUpload
        onImagesSelected={handleImagesSelected}
        maxImages={5}
        existingImages={form.photos}
      />
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Type of Good</label>
      <select
        name="typeOfGood"
        value={form.typeOfGood}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="">Select</option>
        {GOOD_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {errors.typeOfGood && <span className="text-error-DEFAULT text-xs">{errors.typeOfGood}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Category</label>
      <select
        name="category"
        value={form.category}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="">Select</option>
        {CATEGORIES.filter(cat => cat.value !== 'all').map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && <span className="text-error-DEFAULT text-xs">{errors.category}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Condition</label>
      <select
        name="condition"
        value={form.condition}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="">Select</option>
        {CONDITIONS.map((cond) => (
          <option key={cond} value={cond}>
            {cond}
          </option>
        ))}
      </select>
      {errors.condition && <span className="text-error-DEFAULT text-xs">{errors.condition}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Quantity</label>
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
        min={1}
      />
      {errors.quantity && <span className="text-error-DEFAULT text-xs">{errors.quantity}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Unit</label>
      <select
        name="unit"
        value={form.unit}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="kg">Kilograms (kg)</option>
        <option value="tons">Tons</option>
        <option value="boxes">Boxes</option>
        <option value="pieces">Pieces</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Quality</label>
      <input
        type="text"
        name="quality"
        value={form.quality}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      />
      {errors.quality && <span className="text-error-DEFAULT text-xs">{errors.quality}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Location</label>
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
      />
      {errors.location && <span className="text-error-DEFAULT text-xs">{errors.location}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Price per {form.unit} (MAD)</label>
      <input
        type="number"
        name="pricePerUnit"
        value={form.pricePerUnit}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
        min={1}
      />
      {errors.pricePerUnit && <span className="text-error-DEFAULT text-xs">{errors.pricePerUnit}</span>}
    </div>
    <div className="mb-3">
      <label className="block mb-1 font-medium text-secondary-600">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleInputChange}
        className="w-full border px-2 py-1 rounded"
        rows={3}
        placeholder="Describe your product..."
      />
      {errors.description && <span className="text-error-DEFAULT text-xs">{errors.description}</span>}
    </div>
    <div className="mb-3">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.deliveryOptions.available}
          onChange={() => handleToggleChange('available')}
          className="rounded border-neutral-300"
        />
        <span className="text-sm font-medium">Delivery Available</span>
      </label>
    </div>
    
    {/* Product Specifications */}
    <div className="border-t pt-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
      
      <div className="mb-3">
        <label className="block mb-1 font-medium text-secondary-600">Origin</label>
        <input
          type="text"
          name="specifications.origin"
          value={form.specifications.origin}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
          placeholder="e.g., Souss-Massa Region"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium text-secondary-600">Harvest Date</label>
        <input
          type="date"
          name="specifications.harvestDate"
          value={form.specifications.harvestDate}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium text-secondary-600">Best Before Date</label>
        <input
          type="date"
          name="specifications.expiryDate"
          value={form.specifications.expiryDate}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium text-secondary-600">Storage Requirements</label>
        <textarea
          name="specifications.storageRequirements"
          value={form.specifications.storageRequirements}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
          rows={2}
          placeholder="e.g., Keep refrigerated at 2-8°C"
        />
      </div>
    </div>
    <div className="flex justify-end gap-2 mt-4">
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-secondary-600 transition"
      >
        Save
      </button>
    </div>
  </form>
);

const Marketplace: React.FC = () => {
  const { createListing, getAvailableListings } = useMarketplaceStore();
  const { user, login } = useAuthStore();

  // Auto-login as farmer for testing (remove in production)
  useEffect(() => {
    if (!user) {
      login('farmer@demo.com', 'password');
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'rating'>('date');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  const [form, setForm] = useState({
    typeOfGood: "",
    condition: "",
    quantity: "",
    quality: "",
    location: "",
    pricePerUnit: "",
    unit: "kg",
    category: "",
    photos: [] as string[],
    description: "",
    specifications: {
      origin: "",
      harvestDate: "",
      expiryDate: "",
      certifications: [] as string[],
      storageRequirements: "",
    },
    deliveryOptions: {
      available: false,
      estimatedCost: undefined,
      estimatedTime: undefined,
    }
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get initial listings and subscribe to updates
  const availableListings = getAvailableListings();
  const [listings, setListings] = React.useState(availableListings);

  // Update listings when store changes
  React.useEffect(() => {
    setListings(getAvailableListings());
  }, [getAvailableListings]);
  
  const filteredListings = listings
    .filter(listing => 
      (selectedCategory === 'all' || listing.category === selectedCategory) &&
      (searchQuery === '' || 
        listing.typeOfGood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return Number(a.pricePerUnit) - Number(b.pricePerUnit);
        case 'rating':
          return ((b.seller?.rating || 0) - (a.seller?.rating || 0));
        default:
          return new Date(b.timeOfOffer).getTime() - new Date(a.timeOfOffer).getTime();
      }
    });

  const handleImagesSelected = (images: string[]) => {
    setForm(prev => ({
      ...prev,
      photos: images
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...((prev as any)[parent] || {}),
          [child]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        [name]: !prev.deliveryOptions[name as keyof typeof prev.deliveryOptions]
      }
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.typeOfGood) newErrors.typeOfGood = "Type of good is required";
    if (!form.condition) newErrors.condition = "Condition is required";
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) <= 0)
      newErrors.quantity = "Quantity must be a positive number";
    if (!form.quality) newErrors.quality = "Quality is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.pricePerUnit || isNaN(Number(form.pricePerUnit)) || Number(form.pricePerUnit) <= 0)
      newErrors.pricePerUnit = "Price must be a positive number";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    try {
      await createListing({
        farmerId: user.id,
        typeOfGood: form.typeOfGood,
        condition: form.condition,
        quantity: Number(form.quantity),
        unit: form.unit,
        quality: form.quality,
        location: form.location,
        photos: form.photos,
        pricePerUnit: Number(form.pricePerUnit),
        category: form.category as "fruits" | "vegetables" | "grains" | "dairy" | "meat" | "other",
        description: form.description,
        specifications: form.specifications,
        deliveryOptions: form.deliveryOptions,
        seller: {
          name: user.name,
          rating: 0,
          totalSales: 0
        }
      });

      setShowModal(false);
      setForm({
        typeOfGood: "",
        condition: "",
        quantity: "",
        quality: "",
        location: "",
        pricePerUnit: "",
        unit: "kg",
        category: "",
        photos: [],
        description: "",
        specifications: {
          origin: "",
          harvestDate: "",
          expiryDate: "",
          certifications: [],
          storageRequirements: "",
        },
        deliveryOptions: {
          available: false,
          estimatedCost: undefined,
          estimatedTime: undefined,
        }
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-100 p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          {/* Return Button */}
          <div className="mb-4">
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Return
            </Button>
          </div>

          {/* Page Header */}
          <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl font-extrabold text-secondary-600">AgriMove Marketplace</h1>
            <p className="text-secondary-500 mt-2">Discover and trade agricultural products</p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-primary-100">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Select
              value={selectedCategory}
              onChange={(value: string) => setSelectedCategory(value)}
              options={CATEGORIES}
              className="w-full md:w-48"
            />
            <Select
              value={sortBy}
              onChange={(value: string) => setSortBy(value as 'date' | 'price' | 'rating')}
              options={[
                { value: 'date', label: 'Latest' },
                { value: 'price', label: 'Price' },
                { value: 'rating', label: 'Rating' }
              ]}
              className="w-full md:w-48"
            />
            <Button 
              onClick={() => setShowModal(true)} 
              className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Listing
            </Button>
            <Button 
              onClick={() => setShowModal(true)} 
              className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white"
            >
              Add New Listing
            </Button>
          </div>

          {/* Listings Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className="border-2 border-primary-200 rounded-xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl hover:border-primary-400 hover:bg-white transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    {listing.photos && listing.photos.length > 0 ? (
                      <img
                        src={listing.photos[0]}
                        alt={listing.typeOfGood}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                        No image available
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                      {listing.category}
                    </div>
                    {listing.deliveryOptions?.available && (
                      <div className="absolute bottom-2 left-2 bg-green-500/90 text-white backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        Delivery Available
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-secondary-600">{listing.typeOfGood}</h3>
                      {listing.seller && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{listing.seller.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                      {listing.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(listing.timeOfOffer).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 mr-1" />
                        {listing.quality}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-bold text-secondary-600">
                        {listing.pricePerUnit} MAD <span className="text-sm font-normal">per {listing.unit}</span>
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle buy action
                        }}
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Detail Modal */}
          {selectedListing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-secondary-600">{selectedListing.typeOfGood}</h2>
                    <button
                      onClick={() => setSelectedListing(null)}
                      className="text-neutral-500 hover:text-neutral-700"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {selectedListing.photos.length > 0 ? (
                        <div className="space-y-4">
                          <img
                            src={selectedListing.photos[0]}
                            alt={selectedListing.typeOfGood}
                            className="w-full rounded-lg"
                          />
                          <div className="grid grid-cols-4 gap-2">
                            {selectedListing.photos.slice(1).map((photo, index) => (
                              <img
                                key={index}
                                src={photo}
                                alt={`${selectedListing.typeOfGood} ${index + 2}`}
                                className="w-full h-20 object-cover rounded"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-neutral-100 rounded-lg h-64 flex items-center justify-center">
                          No images available
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Product Details</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Category:</dt>
                            <dd>{selectedListing.category}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Condition:</dt>
                            <dd>{selectedListing.condition}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Quality:</dt>
                            <dd>{selectedListing.quality}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Available Quantity:</dt>
                            <dd>{selectedListing.quantity} {selectedListing.unit}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Location:</dt>
                            <dd>{selectedListing.location}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-neutral-600">Price per Unit:</dt>
                            <dd className="font-semibold text-lg text-secondary-600">
                              {selectedListing.pricePerUnit} MAD/{selectedListing.unit}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {selectedListing.seller && (
                        <div>
                          <h3 className="font-semibold mb-2">Seller Information</h3>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <p className="font-medium">{selectedListing.seller.name}</p>
                              <div className="flex items-center text-sm text-neutral-600">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                {selectedListing.seller.rating.toFixed(1)} • {selectedListing.seller.totalSales} sales
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-neutral-600">{selectedListing.description}</p>
                      </div>

                      {selectedListing.specifications && (
                        <div>
                          <h3 className="font-semibold mb-2">Specifications</h3>
                          <dl className="space-y-2">
                            {selectedListing.specifications.origin && (
                              <div className="flex justify-between">
                                <dt className="text-neutral-600">Origin:</dt>
                                <dd>{selectedListing.specifications.origin}</dd>
                              </div>
                            )}
                            {selectedListing.specifications.harvestDate && (
                              <div className="flex justify-between">
                                <dt className="text-neutral-600">Harvest Date:</dt>
                                <dd>{selectedListing.specifications.harvestDate}</dd>
                              </div>
                            )}
                            {selectedListing.specifications.expiryDate && (
                              <div className="flex justify-between">
                                <dt className="text-neutral-600">Best Before:</dt>
                                <dd>{selectedListing.specifications.expiryDate}</dd>
                              </div>
                            )}
                            {selectedListing.specifications.storageRequirements && (
                              <div className="flex justify-between">
                                <dt className="text-neutral-600">Storage Requirements:</dt>
                                <dd>{selectedListing.specifications.storageRequirements}</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      )}

                      <div className="pt-4 border-t">
                        <div className="flex gap-4">
                          <Button className="flex-1" onClick={() => {
                            // Handle buy action
                          }}>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Buy Now
                          </Button>
                          {selectedListing.deliveryOptions?.available && (
                            <Button
                              variant="secondary"
                              className="flex-1"
                              onClick={() => {
                                // Handle request transport action
                              }}
                            >
                              <Truck className="w-4 h-4 mr-2" />
                              Request Transport
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add New Good Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-primary-200">
                <h2 className="text-2xl font-bold mb-4 text-secondary-600">Add New Good</h2>
                <AddGoodForm
                  onSubmit={handleSubmit}
                  form={form}
                  handleInputChange={handleInputChange}
                  handleImagesSelected={handleImagesSelected}
                  handleToggleChange={handleToggleChange}
                  errors={errors}
                  onClose={() => {
                    setShowModal(false);
                    setErrors({});
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;