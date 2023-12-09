'use client';

import axios from 'axios';

let baseURL = '/api';

if (typeof window !== 'undefined') {
  baseURL = `${window.location.origin}/api`;
}

export const baseAPI = axios.create({
  baseURL,
});

baseAPI.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);
