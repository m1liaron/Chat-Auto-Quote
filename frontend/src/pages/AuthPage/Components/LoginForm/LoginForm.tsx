import type React from 'react';
import { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath, ApiPath } from '@/common/enums';
import axios from 'axios';
import { useUser } from '@/contexts/UserProvider';
import { setLocalStorageItem } from '@/helpers';
import { localStorageState } from '@/common/constants';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginForm';
import { GoogleLogin } from '@react-oauth/google';
import type { AuthFormProps } from '@/common/types';
import { FacebookLoginButton } from '../../FacebookLogin/FacebookLogin';

const LoginForm: React.FC<AuthFormProps> = ({ handleGoogleLogin }) => {
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    const { data, status } = await axios.post(`${ApiPath}/auth/login`, { email, password });
    if (status <= 400) {
        const { user ,token } = data;
        setUser(user);
        setLocalStorageItem(localStorageState.TOKEN, token);
        navigate(AppPath.Root);
      } else {
          setError(data.error.message);
      }
  };

  return (
      <div className="register-page">
        <div className="register-card">
          <div className="register-logo">
            <div className="register-logo-box">𝑄</div>
            <h2>Get into account</h2>
            <p>Join us and start sharing inspiring quotes</p>
          </div>

          <form onSubmit={handleLogin} className="register-form">
            {error && <p className="register-error">{error}</p>}

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                id={emailId}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                id={passwordId}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="register-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <GoogleLogin onSuccess={handleGoogleLogin}/>
            <FacebookLoginButton/>
          </div>

          <p className="signin-link">
            Don't have an account? <Link to={AppPath.Register}>Sign up</Link>
          </p>
        </div>
      </div>
  );
};

export { LoginForm };