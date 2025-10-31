import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Truck, Tractor, CheckCircle, CreditCard, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import Logo from '../components/ui/Logo';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = t('common.appName') + ' - ' + t('home.title');
  }, [t]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 via-primary-500 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <div className="animate-fade-in max-w-4xl">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo size="xl" showText={false} className="bg-white/10 rounded-full p-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">
                    AgriMove
                  </h1>
                  <p className="text-xl text-green-100">Connecting Farms to Markets</p>
                </div>
              </div>
              <p className="text-xl mb-8 text-green-50">
                The first agricultural logistics platform connecting farmers with transport providers for efficient product delivery.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {!isAuthenticated && (
                  <>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="!bg-white !text-primary-600 hover:!bg-primary-50 hover:!text-primary-700 border-2 border-white shadow-lg font-bold"
                      onClick={() => navigate('/register')}
                    >
                      {t('common.register')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-lg font-bold"
                      onClick={() => navigate('/login')}
                    >
                      {t('common.login')}
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-lg font-bold"
                  onClick={() => navigate('/demo-info')}
                >
                  View Demo Data
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-lg font-bold"
                  onClick={() => navigate('/marketplace')}
                >
                  Marketplace
                </Button>
                {isAuthenticated && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t('common.dashboard')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">How AgriMove Works</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Our platform makes agricultural logistics simple and efficient, connecting farmers directly with transport providers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {/* For Farmers */}
            <Card className="border-t-4 border-primary-600 hover:transform hover:scale-105 transition-transform duration-300">
              <CardContent>
                <div className="mb-4 h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center">
                  <Tractor className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Farmers</h3>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Request transport for your agricultural goods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Track your shipments in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Reduce logistics costs and time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Find reliable transport partners</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  fullWidth
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                  onClick={() => navigate('/how-it-works-farmers')}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            {/* For Transporters */}
            <Card className="border-t-4 border-secondary-600 hover:transform hover:scale-105 transition-transform duration-300">
              <CardContent>
                <div className="mb-4 h-14 w-14 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Transporters</h3>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Find available transport requests</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maximize your vehicle capacity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Build a reliable customer base</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Get paid securely and promptly</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  fullWidth
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                  onClick={() => navigate('/how-it-works-transporters')}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            {/* How It Works */}
            <Card className="border-t-4 border-neutral-600 hover:transform hover:scale-105 transition-transform duration-300">
              <CardContent>
                <div className="mb-4 h-14 w-14 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-neutral-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Simple Process</h3>
                <ol className="space-y-3 mb-4 relative before:absolute before:left-2.5 before:top-0 before:h-full before:w-0.5 before:bg-neutral-200">
                  <li className="flex items-start pl-8 relative">
                    <div className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                    <span>Farmer creates a transport request</span>
                  </li>
                  <li className="flex items-start pl-8 relative">
                    <div className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <span>Transporters view and accept requests</span>
                  </li>
                  <li className="flex items-start pl-8 relative">
                    <div className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                    <span>Goods are picked up and delivered</span>
                  </li>
                  <li className="flex items-start pl-8 relative">
                    <div className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                    <span>Payment and reviews are exchanged</span>
                  </li>
                </ol>
                <Button 
                  variant="outline" 
                  fullWidth
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                  onClick={() => navigate('/about')}
                >
                  About Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Choose AgriMove?</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Our platform offers unique advantages for agricultural logistics in Morocco and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Regional Expertise</h3>
              <p className="text-neutral-600">
                Specialized in agricultural logistics for Morocco and North Africa, with support in local languages.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-neutral-600">
                Clear, upfront pricing with no hidden fees. Compare options to find the best value.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Access</h3>
              <p className="text-neutral-600">
                Connect with new markets and opportunities by solving logistics challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Agricultural Logistics?</h2>
              <p className="text-xl mb-8 text-secondary-50">
                Join thousands of farmers and transporters already using AgriMove to streamline their operations.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {!isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="lg"
                    className="!bg-white !text-primary-600 hover:!bg-primary-50 hover:!text-primary-700 border-2 border-white shadow-lg font-bold"
                    onClick={() => navigate('/register')}
                  >
                    Get Started Today
                  </Button>
                )}
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="lg"
                    className="!bg-white !text-primary-600 hover:!bg-primary-50 hover:!text-primary-700 border-2 border-white shadow-lg font-bold"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-4"
                  onClick={() => navigate('/marketplace')}
                >
                  Visit Marketplace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;