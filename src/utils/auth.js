import { getCookie, setCookie, removeCookie } from "react-use-cookie";

const key = "_user_data";

export const getUser = () => {
  const user = getCookie(key);
  return user ? JSON.parse(user) : {};
};

export const setUser = (user) => {
  const currentDate = new Date();
  const newDate = new Date(currentDate);
  newDate.setHours(currentDate.getHours() + 24);
  setCookie(key, JSON.stringify(user), {
    expires: newDate,
    SameSite: "Strict",
    Secure: true,
  });
};

export const removeUser = () => {
  removeCookie(key);
};
