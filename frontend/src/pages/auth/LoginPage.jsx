import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationService from '../../utils/notifications';
import api from '../../services/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '' // Add username for admin login
  });
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('user');
  
  const { login, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (loginType === 'admin') {
      try {
        const res = await api.post('/admin/login', { username: formData.username, password: formData.password });
        loginAdmin(res.data.admin, res.data.token);
        window.location.href = '/admin/module';
      } catch (err) {
        NotificationService.error('Invalid admin credentials');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          NotificationService.error(result.message);
        }
      } catch (error) {
        NotificationService.error('An error occurred during login');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg border ${loginType === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginType('user')}
            >
              User
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg border ${loginType === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginType('admin')}
            >
              Admin
            </button>
          </div>
          {loginType === 'admin' && (
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500"
              required={loginType === 'user'}
              disabled={loginType === 'admin'}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;