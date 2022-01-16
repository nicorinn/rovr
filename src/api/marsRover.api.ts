import axios from 'axios';
import { RoverImage } from '../common/types';

interface ApiResponse {
  photos: RoverImage[];
}

const key = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos/',
  params: { api_key: key },
});

export async function getAllImages() {
  const res = await instance.get<ApiResponse>('', {
    params: {
      sol: 2000,
    },
  });
  if (res.status === 200) {
    return res.data.photos;
  } else {
    return [];
  }
}
