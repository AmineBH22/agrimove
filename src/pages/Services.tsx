import React from 'react';
import { Truck, Sprout, Users, Clock, Shield, Map, CreditCard, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Layout from '../components/layout/Layout';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  link: string;
}

const Services: React.FC = () => {
  console.log('Services component rendering'); // Debug log

  const services: Service[] = [
    {
      title: 'Transportation Services',
      description: 'Reliable and efficient transportation for agricultural products with real-time tracking and monitoring.',
      icon: <Truck className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Request Transport',
      link: '/request-transport'
    },
    {
      title: 'Marketplace',
      description: 'Connect with farmers, transporters, and buyers in our agricultural marketplace platform.',
      icon: <Sprout className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Visit Marketplace',
      link: '/marketplace'
    },
    {
      title: 'Community Network',
      description: 'Join our growing community of agricultural professionals and expand your network.',
      icon: <Users className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Join Community',
      link: '/community'
    },
    {
      title: 'Real-time Tracking',
      description: 'Track your shipments in real-time with detailed status updates and notifications.',
      icon: <Clock className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Track Shipment',
      link: '/track-shipment'
    },
    {
      title: 'Secure Payments',
      description: 'Safe and secure payment processing for all transactions on our platform.',
      icon: <Shield className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Learn More',
      link: '/payments'
    },
    {
      title: 'Route Optimization',
      description: 'Smart route planning and optimization for efficient deliveries.',
      icon: <Map className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Explore Routes',
      link: '/routes'
    },
    {
      title: 'Payment Management',
      description: 'Easy payment tracking and management for all your transactions.',
      icon: <CreditCard className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Manage Payments',
      link: '/payments'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you with any queries.',
      icon: <MessageCircle className="w-8 h-8 text-agri-primary" />,
      buttonText: 'Contact Support',
      link: '/support'
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <h1 className="text-4xl font-bold text-agri-dark mb-4 text-center">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
          Discover our comprehensive range of agricultural transport and marketplace services.
        </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <Card key={service.title} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {service.icon}
              <h3 className="text-xl font-semibold text-agri-dark">
                {service.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = service.link}
            >
              {service.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => window.location.href = '/register'}
        >
          Join AgriMove Today
        </Button>
      </div>
    </div>
    </Layout>
  );
};

export default Services;