import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/login.scss';

export default function Login() {
  return (
    <>
      <Header />
      <div className='login-container'>
        <form className='form-container'>
          <label htmlFor="email">
            e-mail:
            <input name="email" id="email" type="text" className="input" placeholder="user@user.com" />
          </label>
          <label htmlFor="password">
            senha:
            <input type="text" name="password" id="password" className="input" placeholder="********" />
          </label>
        </form>
        <button className="btn">Entrar</button>
        <button className="btn signup-button">Cadastre-se</button>
      </div>
      <Footer />
    </>
  );
};
