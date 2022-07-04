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

export const addReview = async (review) => {
  const {data} = await $authHost.post("api/rating",review);
  return data;
};

export const addLike = async (id,like) => {
  const {data} = await $authHost.post("api/rating/like/"+id,like);
  return data;
};
export const updateLike = async (id,like) => {
  const {data} = await $authHost.put("api/rating/like/"+id,like);
  return data;
};
export const deleteLike = async (id) => {
  const {data} = await $authHost.delete("api/rating/like/"+id);
  return data;
};

export const getOneReview = async (id) => {
  const {data} = await $authHost.get("api/rating/"+id);
  return data;
};

