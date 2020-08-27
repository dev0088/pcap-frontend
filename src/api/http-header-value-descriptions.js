import { fileQuery, jsonQuery, query } from "@/api/common";

export async function apiGetHttpHeaderValueDescriptions() {
  return await query("/http_header_value_description/all/", {method: 'GET'});
}

export async function apiDownloadHttpHeaderValueDescriptions() {
  return await query(
    "/http_header_value_description/export-csv/",
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

export async function apiUploadHttpHeaderValueDescriptions(formData) {
  return await fileQuery("/http_header_value_description/import-csv/", 'POST', formData);
}

export async function apiGetHttpHeaderValueDescriptionById(id) {
  return await query(`/http_header_value_description/${id}/`);
}

export async function apiAddHttpHeaderValueDescription(data) {
  return await jsonQuery(`/http_header_value_description/create/`, 'POST', data);
}

export async function apiDeleteHttpHeaderValueDescription(id) {
  return await query(`/http_header_value_description/${id}/`, {method: 'DELETE'});
}

export async function apiUpdateHttpHeaderValueDescription(id, data) {
  return await jsonQuery(`/http_header_value_description/${id}/`, 'PUT', data);
}
