import axios from 'axios';

const API_KEY = '31477323-ee6f1649b5f8691420126c4a5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const { data } = await axios.get(`${axios.defaults.baseURL}`, {
    params: {
      q: query,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};
