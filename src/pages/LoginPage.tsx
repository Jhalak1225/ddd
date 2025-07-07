import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();


     const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Please enter both Email ID and Password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔐 Optional: Store token
      localStorage.setItem('userToken', await user.getIdToken());

      // 🔎 Get user role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        
    //const role = docSnap.data().role;
    // if (role === 'student') {
    //      navigate('/student');
    //  } else if (role === 'teacher') {
    //    navigate('/teacher');
    //  } else if (role === 'admin') {
    //    navigate('/admin');                          uncomment when only user specific role to be allowed
    //  } else {                                          and  lines from 49 - 53 commented
    //    navigate('/dashboard'); // fallback
    //  }
    //} else {
    //  setErrorMsg('User data not found in Firestore.');
    //}
         navigate('/Dashboard');
    } else {
        setErrorMsg('User data not found in Firestore.');
      }
    }
      
    catch (error: any) {
      console.error("Login error:", error);
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome!</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your EmailID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/ForgotPassword">Forgot password?</a>
          </div>

          <button type="submit">Log In</button>
        </form>
        <p className="register-text">
          Don't have an account? <a href="/Register1">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
