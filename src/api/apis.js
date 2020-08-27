import { getFetch } from "@/api/fetch";
import { restApiSettings } from "@/data/config";
import * as axios from 'axios';

const getUrl = function(path) {
  const url = `${restApiSettings.baseURL}${path}`;
  return url;
};

const query = async function(path, options = {}) {	
  if (!options.headers) {	
    options.headers = {	
      "Content-Type": "application/json",	
      "Accept": "application/json"	
    };	
  }
  options.headers = options.headers || {};
  const userInfo = getLocalToken();	
  const token = (userInfo && userInfo.token);	
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  const url = getUrl(path);
  const fetch = await getFetch(options);
  const response = await fetch(url, options);
  if (200 <= response.status && 300 > response.status) {
    if (options && (options.responseType === 'blob')) {
      return response;
    }
    return response.json();
  }
  try {
    const error = await response.json();
    return Promise.reject(new Error(error.exception));
  } catch (error) {
    console.error(error);
    throw new Error(`HTTP status ${response.status} is not OK`);
  }
};

const jsonQuery = async function(path, method, data) {
  return await query(
    path, 
    {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
};

const fileQuery = function(path, method, data) {
  var headers = [];
  const token = (userInfo && userInfo.token);
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const url = getUrl(path);
  return axios.post(url, data, {
    headers: {
      ...headers
    }
  })
  // get data
  .then(response => {
    return response.data;
  })
  // add url field
  .then(res => {
    return res
  });
};

const getLocalToken = function() {
  return localStorage.getItem("userInfo") != null
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
} 

export async function loginWithAPI(data) {
  return await jsonQuery(`/auth/login/`, "POST", data);
}

export async function logoutWithAPI(data) {
  return await jsonQuery(`/auth/loginout/`, "POST", data);
}
export async function apiGetDomains() {
  const userInfo = getLocalToken();
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

export async function apiGetDomainById(id, token) {
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
