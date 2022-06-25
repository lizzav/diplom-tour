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

