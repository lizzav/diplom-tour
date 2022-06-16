import { $host, $authHost } from "./index";
import  jwt_decode from "jwt-decode"
export const registration = async (email, password) => {
  const {data} = await $host.post("api/user/registrations", {
    email,
    password,
    role: "ADMIN"
  });
  localStorage.setItem('token',data.token)
  return jwt_decode(data.token);
};
export const login = async (email, password) => {
  const {data} = await $host.post("api/user/login", {
    password,
    email
  });
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
};

export const check = async () => {
  const {data} = await $authHost.get("api/user/auth");
  localStorage.setItem('token', data.token)

  return jwt_decode(data.token);
};
