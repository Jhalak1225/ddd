import React from 'react';
import '../styles/LoginPage.css';

const LoginForm: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome!</h2>
        <form>
          <input type="email" placeholder="Enter your email" required />
<input type="password" placeholder="Enter your password" required />

          
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/ForgotPassword">Forgot password?</a>
          </div>
          
          <button type="submit">Log In</button>
        </form>
        <p className="register-text">Don't have an account? <a href="/Register">Register</a></p>
      </div>
    </div>
  );
};

export default LoginForm;

