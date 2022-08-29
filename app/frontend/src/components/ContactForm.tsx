import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../utils/server';
import { getUserKey } from '../utils/localStorage';
import '../styles/contactForm.scss';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('false');

  const navigate = useNavigate();

  const createUserContact = async (
    name: string,
    phone: string,
    whatsapp: string,
    email: string
  ) => {
    const wpp = whatsapp === 'false' ? false : true;
    const userId = getUserKey();
    if (!userId) return navigate('/login');
    const contact = await createContact(name, phone, wpp, email, userId);
    if (!contact) return window.alert('Problema no banco de dados.');
    return window.location.reload();
  }

  return (
    <div className="create-contact-container">
      <form className="contact-form">
        <label htmlFor="name">
          Nome:&nbsp;
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="phone">
          Telefone:&nbsp;
          <input
            id="phone"
            name="phone"
            maxLength={ 11 }
            type="text"
            className="input"
            onChange={({ target }) => setPhone(target.value)}
          />
        </label>
        <label htmlFor="whatsapp">
          Whatsapp:&nbsp;
          <select
            onChange={({ target }) => setWhatsapp(target.value)}
            className="input"
            name="whatsapp"
            id="whatsapp"
          >
            <option value="true">sim</option>
            <option value="false" selected>não</option>
          </select>
        </label>
        <label htmlFor="email">
          email:&nbsp;
          <input
            id="email"
            type="text"
            name="email"
            className="input"
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <button
          className="create-contact"
          type="button"
          onClick={() => createUserContact(name, phone, whatsapp, email)}
        >
          Adicionar contato
        </button>
      </form>
    </div>
  );
};
