import axios from 'axios';
import { handleError } from 'lib/handleError';
import { useAppStore } from 'store';

// axios.defaults.baseURL = 'http://192.168.100.19:4001';

//application/xml

type Fetch = {
  url: RequestInfo;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  useCredentials?: boolean;
  body?: Record<any, any>;
  headers?: Record<any, any>;
  queryParams?: Record<any, any>;
};
// const BASE_URL = 'http://172.20.10.3:4001';
const BASE_URL = 'https://realkaya-be-development.up.railway.app';

const _fetch = <T = unknown>({
  url,
  method,
  useCredentials = false,
  body,
  headers = {},
  queryParams,
}: Fetch): Promise<T> => {
  const _token = useAppStore.getState().user?.token;
  const token = _token ? `Bearer ${_token}` : undefined;

  const _headers = new Headers({
    'content-type': 'application/json', // by default setting the content-type to be json type
    ...headers,
  });

  if (token) _headers.set('authorization', token);

  const options: RequestInit = {
    method,
    headers: _headers,
    body: body ? JSON.stringify(body) : null,
  };

  if (useCredentials) options.credentials = 'include';

  let _url = BASE_URL + url;

  if (queryParams) {
    _url = `${_url}?${new URLSearchParams(queryParams).toString()}`;
  }

  return fetch(_url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(function (json) {
          return Promise.reject({
            status: res.status,
            body: json,
          });
        });
      }
    })
    .catch((e) => {
      handleError(e);
      return Promise.reject(e);
    }) as Promise<T>;
};

const _fetchImage = <T = unknown>({
  url,
  method,
  body,
}: Omit<Fetch, 'body'> & { body: RequestInit['body'] }): Promise<T> => {
  const headers = new Headers({
    'Content-Type': 'multipart/form-data', // by default setting the content-type to be json type
    accept: 'application/xml',
  });

  return fetch(url, {
    method,
    headers,
    body,
  })
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        return res.text().then(function (text) {
          return Promise.reject({
            status: res.status,
            body: text,
          });
        });
      }
    })
    .catch((e) => {
      handleError(e);
      return Promise.reject(e);
    }) as Promise<T>;
};

export { _fetch, _fetchImage };
