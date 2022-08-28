import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { Contact } from '../types/contact';
import { getUserKey } from '../utils/localStorage';
import { getContacts } from '../utils/server';

export default function Table() {
  const [contacts, setContacts] = useState(Array<Contact>);

  // const navigate = useNavigate();

  const getUserContacts = async () => {
    const userId = getUserKey();
    // if (!userId) return navigate('/login');
    if (!userId) return window.alert('Sem contatos');
    const contacts = await getContacts(userId);
    console.log(contacts);
    if(!contacts) return window.alert('Problema no banco de dados.');
    setContacts(contacts);
  }

  useEffect(() => {
    getUserContacts();
  }, []);

  return (
    <>
      <TableHead />
      {
        contacts.map(({ id, name, phone, email, whatsapp }) =>
          <TableRow
            key={ id }
            name={ name }
            phone={ phone }
            email={ email }
            id={ id }
            whatsapp={ whatsapp }
          />)
      }
      {/* <TableRow name={ 'teste' } email={ 'teste@teste.com' } phone={ '12345678977' } /> */}
    </>
  );
};
