import { jsonQuery, query } from "@/api/common";
import { getLocalToken } from "@/api/common";

export const getUserInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.user : null;
  return userInfo;
}

export async function apiUserById(id) {
  return await query(`/auth/profile/${id}/`);
}

export async function apiUpdateUser(id, data) {
  return await jsonQuery(`/auth/profile/${id}/`, 'PUT', data);
}
