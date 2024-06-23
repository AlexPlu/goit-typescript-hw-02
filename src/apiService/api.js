import axios from "axios";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "XoQw9hMaXaely2MQ0IlhL_BkKlV9Mt9KmMvuzGRGXII";

export const fetchImages = async (searchQuery, pageNumber) => {
  const response = await axios.get(UNSPLASH_API_URL, {
    params: {
      query: searchQuery,
      page: pageNumber,
      client_id: UNSPLASH_ACCESS_KEY,
    },
  });
  return response.data;
};
