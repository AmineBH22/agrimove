import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, User, Phone, Tractor, Truck, Store } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formError, setFormError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    
    if (!agreeTerms) {
      setFormError('You must agree to the Terms and Conditions');
      return;
    }
    
    try {
      await register({
        name,
        email,
        password,
        role,
        phoneNumber: phoneNumber || undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the store
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-neutral-50 py-12">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900">{t('auth.signUp')}</h1>
              <p className="text-neutral-600 mt-2">
                {t('auth.hasAccount')} <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">{t('auth.signIn')}</Link>
              </p>
            </div>
            
            {(error || formError) && (
              <div className="mb-6 bg-error-light/10 text-error-DEFAULT p-3 rounded-md text-sm">
                {formError || error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={t('auth.name')}
                type="text"
                id="name"
                leftIcon={<User className="h-5 w-5" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                fullWidth
                required
              />
              
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  leftIcon={<Lock className="h-5 w-5" />}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  fullWidth
                  required
                />
              </div>
              
              <Input
                label={t('auth.phoneNumber')}
                type="tel"
                id="phoneNumber"
                leftIcon={<Phone className="h-5 w-5" />}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+212XXXXXXXXX"
                fullWidth
              />
              
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">{t('auth.role')}</p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    className={`flex items-center justify-center space-x-2 border rounded-md px-4 py-2 ${
                      role === 'farmer'
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    onClick={() => setRole('farmer')}
                  >
                    <Tractor className="h-5 w-5" />
                    <span>{t('auth.farmer')}</span>
                  </button>

                  <button
                    type="button"
                    className={`flex items-center justify-center space-x-2 border rounded-md px-4 py-2 ${
                      role === 'transporter'
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    onClick={() => setRole('transporter')}
                  >
                    <Truck className="h-5 w-5" />
                    <span>{t('auth.transporter')}</span>
                  </button>

                  <button
                    type="button"
                    className={`flex items-center justify-center space-x-2 border rounded-md px-4 py-2 ${
                      role === 'store'
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    onClick={() => setRole('store')}
                  >
                    <Store className="h-5 w-5" />
                    <span>Store/Client</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                  {t('auth.termsAgree')}
                </label>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                icon={<UserPlus className="h-5 w-5" />}
              >
                {t('auth.signUp')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;