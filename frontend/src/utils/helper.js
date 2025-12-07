export const saveToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("auth_token");
};

export const isEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
