import { fileQuery, jsonQuery, query } from "@/api/common";

export async function apiGetDomains() {
  return await query("/domain/all/", {method: 'GET'});
}

export async function apiDownloadDomains() {
  return await query(
    "/domain/export-csv/",
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

export async function apiUploadDomains(formData) {
  return await fileQuery("/domain/import-csv/", 'POST', formData);
}

export async function apiGetDomainById(id) {
  return await query(`/domain/${id}/`);
}

export async function apiAddDomain(data) {
  return await jsonQuery(`/domain/create/`, 'POST', data);
}

export async function apiDeleteDomain(id) {
  return await query(`/domain/${id}/`, {method: 'DELETE'});
}

export async function apiUpdateDomain(id, data) {
  return await jsonQuery(`/domain/${id}/`, 'PUT', data);
}
