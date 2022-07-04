import { $host, $authHost } from "./index";
import  jwt_decode from "jwt-decode"

export const fetchCountry= async () => {
  const {data} = await $host.get("api/country");
  return data;
};
export const fetchOneCountry = async (id) => {
  const {data} = await $host.get("api/country/"+id);
  return data;
};
export const createCountry = async (country) => {
  console.log(12344)
  const {data} = await $authHost.post("api/country", country);
  return data;
};
export const updateCountry = async (id,country) => {
  console.log(12344)
  const {data} = await $authHost.put("api/country/"+id, country);
  return data;
};

