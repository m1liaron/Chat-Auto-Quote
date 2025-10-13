import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath, ApiPath } from '@/common/enums';
import axios from 'axios';
import { useUser } from '@/contexts/UserProvider';
import { setLocalStorageItem } from '@/helpers';
import { localStorageState } from '@/common/constants';
import './LoginForm';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <div>
          <label className="login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="login-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
        <Link to={AppPath.Register}>Already have an account?</Link>      
      </form>
    </div>
  );
};

export { LoginForm };