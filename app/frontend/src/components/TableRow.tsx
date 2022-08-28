import React from 'react';
import { Contact } from '../types/contact';
import '../styles/tableRow.scss';

export default function TableRow({ name, phone, email }: Partial<Contact>) {
  return (
    <div className="table-contact-container">
      <tr className="table-data-container">
        <td>{ name }</td>
        <td>{ phone }</td>
        <td>{ email }</td>
        <div>
          <button>excluir</button>
          <button>editar</button>
        </div>
      </tr>
    </div>
  );
};
