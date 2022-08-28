import { useState } from 'react';
import { updateContact } from '../utils/server';
import '../styles/editForm.scss';
import { EditContactProps } from '../types/EditContact';

export default function EditContact({
    id,
    name,
    email,
    phone,
    whatsapp,
    set,
    edit
  }: EditContactProps) {
  const [contactName, setContactName] = useState(name);
  const [contactEmail, setContactEmail] = useState(email);
  const [contactPhone, setContactPhone] = useState(phone);
  const [
    contactWhatsapp,
    setContactWhatsapp
  ] = useState(whatsapp ? 'true' : 'false');

  const update = async (
    id: string,
    name: string,
    phone: string,
    email: string,
    whatsapp: string
  ) => {
    const wpp = whatsapp === 'true' ? true : false;
    const contact = await updateContact(id, name, phone, wpp, email);
    if (!contact) return window.alert('Problema no banco de dados');
    return window.location.reload();
  }

  return (
    <form className="edit-form">
      <label htmlFor="name">
        Nome:&nbsp;
        <input
          id="name"
          name="name"
          type="text"
          onChange={({ target }) => setContactName(target.value)}
          value={ contactName }
        />
      </label>
      <label htmlFor="phone">
        Telefone:&nbsp;
        <input
          id="phone"
          name="phone"
          maxLength={ 11 }
          type="text"
          onChange={({ target }) => setContactPhone(target.value)}
          value={ contactPhone }
        />
      </label>
      <label htmlFor="whatsapp">
        Whatsapp:&nbsp;
        <select
          onChange={({ target }) => setContactWhatsapp(target.value)}
          name="whatsapp"
          id="whatsapp"
          value={ contactWhatsapp }
        >
          <option value="true">sim</option>
          <option value="false">não</option>
        </select>
      </label>
      <label htmlFor="email">
        email:&nbsp;
        <input
          id="email"
          type="text"
          name="email"
          onChange={({ target }) => setContactEmail(target.value)}
          value={ contactEmail }
        />
      </label>
      <button
        type="button"
        onClick={() => set(!edit)}
      >
        cancelar
      </button>
      <button
        type="button"
        onClick={() => update(
              id,
              contactName,
              contactPhone,
              contactEmail,
              contactWhatsapp
            )}
      >finalizar</button>
    </form>
  );
};
