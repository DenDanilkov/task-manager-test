import httpClient from './httpClient';
import tasksApi from './tasksApi';
import auth from './auth';
import statusesApi from './statusesApi';

export function apiFactory(http) {
  return {
    tasks: tasksApi(http),
    statuses: statusesApi(http),
  };
}
export function authFactory(http) {
  return {
    auth: auth(http),
  };
}

const host = 'http://localhost:3500';
const http = httpClient(`${host}/api/`);
const authHttp = httpClient(`${host}/auth/`);

export const api = apiFactory(http);
export const authRequests = authFactory(authHttp);
