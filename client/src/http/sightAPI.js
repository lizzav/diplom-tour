import { $host, $authHost } from "./index";
import  jwt_decode from "jwt-decode"

export const fetchSight = async () => {
  const {data} = await $host.get("api/sight");
  return data;
};
export const fetchOneSight = async (id) => {
  const {data} = await $host.get("api/sight/"+id);
  return data;
};

