import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formMessage, setFormMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setFormMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', data);

      const user = res.data.user;

      // Save token and user to localStorage
      localStorage.setItem('token', res.data.token || '');
      localStorage.setItem('user', JSON.stringify(user));

      setFormMessage('Login successful!');

      setTimeout(() => {
        navigate('/home', { state: { id: user._id } }); // ✅ Send user ID to home
      }, 1000);
    } catch (error) {
      setFormMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 shadow-xl rounded-2xl px-10 py-12 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-indigo-200"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 3, message: 'Min 3 characters' },
            })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-indigo-200"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Message */}
        {formMessage && (
          <p
            className={`text-sm text-center mb-4 ${
              formMessage.includes('success') ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {formMessage}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold ${
            loading && 'opacity-50'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
