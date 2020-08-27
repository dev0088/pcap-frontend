import { fileQuery, jsonQuery, query } from "@/api/common";

export async function apiGetHttpHeaderDescriptions() {
  return await query("/http_header_description/all/", {method: 'GET'});
}

export async function apiDownloadHttpHeaderDescriptions() {
  return await query(
    "/http_header_description/export-csv/",
    {
      method: 'GET',
      headers: {
        "Content-Type": "blob",
        "Accept": "application/json"
      },
      responseType: 'blob'
    }
  );
}

export async function apiUploadHttpHeaderDescriptions(formData) {
  return await fileQuery("/http_header_description/import-csv/", 'POST', formData);
}

export async function apiGetHttpHeaderDescriptionById(id) {
  return await query(`/http_header_description/${id}/`);
}

export async function apiAddHttpHeaderDescription(data) {
  return await jsonQuery(`/http_header_description/create/`, 'POST', data);
}

export async function apiDeleteHttpHeaderDescription(id) {
  return await query(`/http_header_description/${id}/`, {method: 'DELETE'});
}

export async function apiUpdateHttpHeaderDescription(id, data) {
  return await jsonQuery(`/http_header_description/${id}/`, 'PUT', data);
}
