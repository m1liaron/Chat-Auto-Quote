import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPath, ApiPath } from '@/common/enums';
import axios from 'axios';
import { useUser } from '../../../../contexts/UserProvider';
import { setLocalStorageItem } from '@/helpers';
import { localStorageState } from '@/common/constants';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    const { data, status } = await axios.post(`${ApiPath}/auth/register`, { firstName, lastName, email, password });
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
        <h2 className="login-title">Register</h2>

        {error && <p className="login-error">{error}</p>}

        <div>
          <label className="login-label">Firstname</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="login-input"
            placeholder="Alex"
          />
        </div>

        <div>
        <label className="login-label">Lastname</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="login-input"
            placeholder="Konopla"
          />
        </div>


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
        <Link to={AppPath.Login}>Already have an account?</Link>      
      </form>
    </div>
  );
};

export { RegisterForm };