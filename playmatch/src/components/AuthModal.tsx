import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onLogin: (userData: any) => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onLogin, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sport: '',
    skillLevel: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.sport) {
        newErrors.sport = 'Please select your favorite sport';
      }
      if (!formData.skillLevel) {
        newErrors.skillLevel = 'Please select your skill level';
      }
      if (!formData.location) {
        newErrors.location = 'Location is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      sport: formData.sport || 'Football',
      skillLevel: formData.skillLevel || 'Intermediate',
      location: formData.location || 'City Center',
      joinDate: new Date().toISOString(),
      stats: {
        wins: Math.floor(Math.random() * 20) + 5,
        losses: Math.floor(Math.random() * 10) + 1,
        goals: Math.floor(Math.random() * 30) + 10,
        assists: Math.floor(Math.random() * 20) + 5
      }
    };

    onLogin(userData);
    setIsLoading(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      sport: '',
      skillLevel: '',
      location: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white font-orbitron">
              {mode === 'login' ? 'Welcome Back' : 'Join PlayMatch'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Favorite Sport</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.sport ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  >
                    <option value="">Select your favorite sport</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Badminton">Badminton</option>
                  </select>
                  {errors.sport && <p className="text-red-400 text-sm mt-1">{errors.sport}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skill Level</label>
                  <select
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.skillLevel ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  >
                    <option value="">Select your skill level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                  {errors.skillLevel && <p className="text-red-400 text-sm mt-1">{errors.skillLevel}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.location ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    placeholder="Enter your location"
                  />
                  {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <i className={`fas ${mode === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-emerald-400 hover:text-emerald-300 ml-2 transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-400">Email: demo@playmatch.com</p>
              <p className="text-xs text-gray-400">Password: demo123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;