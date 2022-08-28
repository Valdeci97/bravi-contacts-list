import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.scss';
import { create } from '../utils/server';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const createUser = async (name: string, email: string, password: string) => {
    const user = await create(name, email, password);
    if (!user) return window.alert('Usuário já cadastrado!');
    window.alert('Usuário criado com sucesso!');
    navigate('/login');
  }

  return (
    <>
      <Header />
      <div className="signup-container">
        <form className="form-container">
          <label htmlFor="name">
            nome:
            <input
              id="name"
              type="text"
              name="name"
              className="input"
              placeholder="seu nome"
              onChange= {({ target }) => setName(target.value)}
              value= { name }
            />
          </label>
          <label htmlFor="email">
            e-mail:
            <input
              id="email"
              type="text"
              name="email"
              className="input"
              placeholder="user@user.com"
              onChange= {({ target }) => setEmail(target.value)}
              value= {email}
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="text"
              name="password"
              className="input"
              placeholder="********"
              onChange= {({ target }) => setPassword(target.value)}
              value= { password }
            />
          </label>
          <button
            type="button"
            className="btn signup"
            onClick={() => createUser(name, email, password)}
          >
            Cadastrar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
