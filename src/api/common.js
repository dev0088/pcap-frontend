import { getFetch } from "@/api/fetch";
import { restApiSettings } from "@/data/config";
import * as axios from 'axios';

const getLocalToken = function() {
  return localStorage.getItem("userInfo") != null
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
};

const getUrl = function(path) {
  const url = `${restApiSettings.baseURL}${path}`;
  return url;
};

export const query = async function(path, options = {}) {	
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

export const jsonQuery = async function(path, method, data) {
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

export const fileQuery = function(path, method, data) {
  var headers = [];
  const userInfo = getLocalToken();
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


