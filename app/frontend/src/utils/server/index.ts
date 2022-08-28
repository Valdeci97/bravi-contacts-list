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
    const user: User = await API.post("/login", {
      email,
      password,
    });
    return user;
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
    const contacts: Contact[] = await API.get(`/contacts/${userId}`);
    return contacts;
  } catch (err) {
    console.log("algo deu errado");
  }
};
