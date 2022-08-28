import axios from "axios";

const URL = "http://localhost:3001";

const API = axios.create({
  baseURL: URL,
});

export const login = async (email: string, password: string) => {
  try {
    const user = await API.post("/login", {
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
