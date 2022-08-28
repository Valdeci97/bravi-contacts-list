import axios from "axios";
import { Contact } from "../../types/contact";
import { User } from "../../types/user";

const URL = "http://localhost:3001";

const API = axios.create({
  baseURL: URL,
});

export const login = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const user = await API.post("/login", {
      email,
      password,
    });
    return user.data.user as User;
  } catch (err) {
    console.log("Algo deu errado");
  }
};

export const create = async (name: string, email: string, password: string) => {
  try {
    const user = await API.post("/users", {
      name,
      email,
      password,
    });
    return user;
  } catch (err) {
    console.log("Algo deu errado");
  }
};

export const getContacts = async (
  userId: string
): Promise<Contact[] | undefined> => {
  try {
    const contacts = await API.get(`/contacts/${userId}`);
    return contacts.data as Contact[];
  } catch (err) {
    console.log("algo deu errado");
  }
};

export const createContact = async (
  name: string,
  phone: string,
  whatsapp: boolean,
  email: string,
  userId: string
): Promise<Contact | undefined> => {
  try {
    const contact = await API.post("/contacts", {
      name,
      phone,
      whatsapp,
      email,
      userId,
    });
    return contact.data.contact as Contact;
  } catch (err) {
    console.log("algo deu errado");
  }
};

export const updateContact = async (
  id: string,
  name: string,
  phone: string,
  whatsapp: boolean,
  email: string
) => {
  try {
    const contact = await API.put("/contacts", {
      id,
      name,
      phone,
      whatsapp,
      email,
    });
    return contact;
  } catch (err) {
    console.log("Algo deu errado");
  }
};

export const deleteContact = async (id: string) => {
  try {
    await API.delete(`/contacts/${id}`);
  } catch (err) {
    return err;
  }
};
