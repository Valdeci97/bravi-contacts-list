export const createUserKey = (id: string) => {
  localStorage.setItem("user", id);
};

export const getUserKey = (): string | null => {
  return localStorage.getItem("user");
};
