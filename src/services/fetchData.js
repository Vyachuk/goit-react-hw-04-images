import axios from 'axios';

const API_KEY = '36986465-56bab1af629ac84504d809b09';

const instance = axios.create({
  baseURL: 'https://pixabay.com',
});

export const getPhoto = async params => {
  const fetch = await instance.get('/api', {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      ...params,
    },
  });
  return fetch.data;
};
