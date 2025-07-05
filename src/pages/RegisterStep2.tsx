// src/pages/RegisterStep2.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/Register2.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterStep2: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('registerData');
    if (!data) {
      alert('No data found. Redirecting to Step 1');
      navigate('/Register1');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const newErrors: Partial<FormData> = { ...errors };
    if (name === 'email') {
      if (!value.trim()) newErrors.email = 'EmailID is required';
      else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Invalid EmailID';
      else delete newErrors.email;
    } else if (name === 'password') {
      if (!value.trim()) newErrors.password = 'Password is required';
      else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)) {
        newErrors.password = 'Password should be more thean 8 charcters. It should contain letters, numbers and special charcters';
      } else delete newErrors.password;
    } else if (name === 'confirmPassword') {
      if (value !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
      else delete newErrors.confirmPassword;
    }
    setErrors(newErrors);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    Object.keys(errors).length > 0 ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    alert('Please fix the errors.');
    return;
  }

  const step1Data = JSON.parse(localStorage.getItem('registerData') || '{}');
  const fullData = { ...step1Data, ...formData };

  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('fullRegisterData', JSON.stringify(fullData));
      setSuccessMessage('Registration Successful! Redirecting to Login Page...');
      setTimeout(() => navigate('/Login'), 2000);
    } else {
      console.error('❌ Backend error:', result);
      alert(result.error || 'Registration failed');
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    alert('Something went wrong. Please try again.');
  }
};




const [successMessage, setSuccessMessage] = useState('');

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register - Step 2</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="password-wrapper">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className={errors.password ? 'input-error' : ''}
    required
  />
  <span onClick={() => setShowPassword(!showPassword)} className="toggle-icon">
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
{errors.password && <p className="error-text">{errors.password}</p>}

<div className="password-wrapper">
  <input
    type={showPassword ? 'text' : 'password'}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    className={errors.confirmPassword ? 'input-error' : ''}
    required
  />
  <span onClick={() => setShowPassword(!showPassword)} className="toggle-icon">
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
{errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <button type="button" className="btn-secondary" onClick={() => navigate('/Register1')}>
           Previous
          </button>
          <button type="submit">Register</button>

  {successMessage && <p className="success-text">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterStep2;
