import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath, ApiPath } from '@/common/enums';
import axios from 'axios';
import { useUser } from '@/contexts/UserProvider';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaUser } from 'react-icons/fa';

const RegisterForm: React.FC = () => {
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');

    const response = await axios.post(`${ApiPath}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });

    if (response.status <= 400) {
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate(AppPath.Root);
    } else {
      setError(response.data.error.message);
    }
  };

  return (
      <div className="register-page">
        <div className="register-card">
          <div className="register-logo">
            <div className="register-logo-box">𝑄</div>
            <h2>Create Account</h2>
            <p>Join us and start sharing inspiring quotes</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            {error && <p className="register-error">{error}</p>}

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                id={firstNameId}
                type="text"
                placeholder="Full Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                id={lastNameId}
                type="text"
                placeholder="Full Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                id={confirmPasswordId}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-btn google">
              <FaGoogle /> Google
            </button>
            <button type="button" className="social-btn facebook">
              <FaFacebookF /> Facebook
            </button>
          </div>

          <p className="signin-link">
            Already have an account? <Link to={AppPath.Login}>Sign in</Link>
          </p>
        </div>
      </div>
  );
};

export { RegisterForm };
