import { URL } from '../constants/constants';

const useApi = async (verb, data) => {
  const init = {
    method: verb,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  };
  const response = await fetch(URL, init);
  return response;
};

export default useApi;
