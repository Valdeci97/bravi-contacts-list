import { useState } from 'react';
import { Contact } from '../types/contact';
import EditContact from './EditContact';
import { deleteContact } from '../utils/server';
import '../styles/tableRow.scss';

export default function TableRow({ id, name, phone, email, whatsapp }: Contact) {
  const [editContact, setEditContact] = useState(false);

  const destroy = async (id: string) => {
    try {
      await deleteContact(id);
      return window.location.reload();
    } catch (err) {
      return window
        .alert('Não foi possível excluir o contato, problema com a api.');
    }

  };

  return (
    <div className="table-contact-container">
      <tr className="table-data-container">
        <td>{ name }</td>
        <td>{ phone }</td>
        <td>{ email }</td>
        <div>
          <button
            type="button"
            onClick={() => setEditContact(!editContact)}
            disabled={ editContact }
          >editar</button>
          <button
            type="button"
            disabled={ editContact }
            onClick={() => destroy(id)}
          >excluir</button>
        </div>
      </tr>
      {
        editContact &&
          <EditContact
            id={ id }
            name={ name }
            phone={ phone }
            email={ email }
            whatsapp={ whatsapp }
            set={ setEditContact }
            edit={ editContact }
          />
      }
    </div>
  );
};
