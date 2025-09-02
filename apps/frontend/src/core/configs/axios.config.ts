import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-type': 'application/json' },
};

export const axiosClassic = axios.create(config);
