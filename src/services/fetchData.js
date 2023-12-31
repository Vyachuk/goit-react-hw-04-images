import axios from 'axios';

const API_KEY = '36986465-56bab1af629ac84504d809b09';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    per_page: 12,
  },
});

export const getPhoto = async ({ q, page }) => {
  const { data } = await instance.get(`?q=${q}&page=${page}`);

  return data;
};
