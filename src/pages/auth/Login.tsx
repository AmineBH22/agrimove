import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock, Tractor, Truck } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the store
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-neutral-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900">{t('auth.signIn')}</h1>
              <p className="text-neutral-600 mt-2">
                {t('auth.noAccount')} <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">{t('auth.signUp')}</Link>
              </p>
            </div>
            
            {(error || formError) && (
              <div className="mb-6 bg-error-light/10 text-error-DEFAULT p-3 rounded-md text-sm">
                {formError || error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={t('auth.email')}
                type="email"
                id="email"
                leftIcon={<Mail className="h-5 w-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                fullWidth
                required
              />
              
              <Input
                label={t('auth.password')}
                type="password"
                id="password"
                leftIcon={<Lock className="h-5 w-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                required
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                icon={<LogIn className="h-5 w-5" />}
              >
                {t('auth.signIn')}
              </Button>
              
              {/* Demo accounts - for demonstration purposes only */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-500 text-center mb-4">Demo Accounts</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEmail('farmer@example.com');
                      setPassword('password');
                    }}
                    className="text-sm"
                    icon={<Tractor className="h-4 w-4" />}
                  >
                    Farmer Demo
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEmail('transport@example.com');
                      setPassword('password');
                    }}
                    className="text-sm"
                    icon={<Truck className="h-4 w-4" />}
                  >
                    Transporter Demo
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;