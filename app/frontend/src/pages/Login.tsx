import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/login.scss';
import { login } from '../utils/server';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <>
      <Header />
      <div className='login-container'>
        <form className='form-container'>
          <label htmlFor="email">
            e-mail:
            <input
              name="email"
              id="email"
              type="text"
              className="input"
              placeholder="user@user.com"
              onChange={({ target }) => setEmail(target.value)}
              value={ email }
            />
          </label>
          <label htmlFor="password">
            senha:
            <input
              type="text"
              name="password"
              id="password"
              className="input"
              placeholder="********"
              onChange={({ target }) => setPassword(target.value)}
              value={ password }
            />
          </label>
        </form>
        <button
          className="btn"
          onClick={() => login(email, password)}
          type="button"
        >
          Entrar
        </button>
        <button
          type="button"
          className="btn signup-button"
          onClick={() => navigate('/signup')}
        >
          Cadastre-se
        </button>
      </div>
      <Footer />
    </>
  );
};
