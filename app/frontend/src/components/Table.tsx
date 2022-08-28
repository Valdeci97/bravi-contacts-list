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
        contacts.map(({ name, phone, email }) =>
          <TableRow name={ name } phone={ phone } email={ email } />)
      }
    </>
  );
};
