import { getFetch } from "@/api/fetch";
import { restApiSettings } from "@/data/config";
import * as axios from 'axios';

const getUrl = function(path) {
  const url = `${restApiSettings.baseURL}${path}`;
  return url;
};

const query = async function(path, options = {}, token) {
  options.headers = options.headers || {};
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

const jsonQuery = async function(path, method, data, token) {
  return await query(
    path, 
    {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    },
    token
  );
};

const fileQuery = function(path, method, data, token) {
  var headers = [];
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

export async function getDomains(params) {
  const userInfo = getLocalToken();
  return await query("/domain/all/", params, (userInfo && userInfo.token));
}

export async function downloadDomains() {
  const userInfo = getLocalToken();
  return await query(
    "/domain/export-csv/",
    {
      method: 'GET',
      headers: {
        "Content-Type": "blob",
        "Accept": "application/json"
      },
      responseType: 'blob'
    },
    (userInfo && userInfo.token));
}

export async function uploadDomains(formData) {
  const userInfo = getLocalToken();
  return await fileQuery("/domain/import-csv/", 'POST', formData, (userInfo && userInfo.token));
}

export function getDomainById(id, token) {
  const userInfo = getLocalToken();
  return query(`/domain/${id}/`, token);
}
