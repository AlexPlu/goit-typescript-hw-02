import axios from "axios";
import { UnsplashImage } from '../types';

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "XoQw9hMaXaely2MQ0IlhL_BkKlV9Mt9KmMvuzGRGXII";

interface UnsplashResponse {
  results: UnsplashImage[];
}

export const fetchImages = async (searchQuery: string, pageNumber: number): Promise<UnsplashResponse> => {
  const response = await axios.get<UnsplashResponse>(UNSPLASH_API_URL, {
    params: {
      query: searchQuery,
      page: pageNumber,
      client_id: UNSPLASH_ACCESS_KEY,
    },
  });
  return response.data;
};
