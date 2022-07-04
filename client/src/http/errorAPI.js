import { $host, $authHost } from "./index";
import  jwt_decode from "jwt-decode"

export const fetchCities= async () => {
  const {data} = await $host.get("api/city");
  return data;
};
export const addError = async (error) => {
  const {data} = await $authHost.post("api/error", error);
  return data;
};
export const getErrors = async () => {
  const {data} = await $authHost.get("api/error");
  return data;
};
export const updateError = async (id, error) => {
  const {data} = await $authHost.put("api/error/"+id, error);
  return data;
};

