import { $host, $authHost } from "./index";
import  jwt_decode from "jwt-decode"

export const fetchTravel= async () => {
  const {data} = await $authHost.get("api/travel");
  return data;
};
export const fetchOneTravel = async (id) => {
  const {data} = await $authHost.get("api/travel/"+id);
  return data;
};
export const createTravel = async (travel) => {
  const {data} = await $authHost.post("api/travel", travel);
  return data;
};
export const deleteTravel = async (id) => {
  const {data} = await $authHost.delete("api/travel/"+id);
  return data;
};
export const putSight = async (id,travel) => {
  const {data} = await $authHost.post("api/travel/sight/"+id, travel);
  return data;
};

export const updateTravel = async (id,travel) => {
  const {data} = await $authHost.put("api/travel/"+id, travel);
  return data;
};
export const updateTravelSight = async (id,travel) => {
  const {data} = await $authHost.put("api/travel/sight/"+id, travel);
  return data;
};
export const deleteTravelSight = async (id,travel) => {
  console.log(travel)
  const {data} = await $authHost.delete("api/travel/sight/"+id);
  return data;
};
