import { jsonQuery } from "@/api/common";

export async function loginWithAPI(data) {
  return await jsonQuery(`/auth/login/`, "POST", data);
}

export async function logoutWithAPI(data) {
  return await jsonQuery(`/auth/loginout/`, "POST", data);
}