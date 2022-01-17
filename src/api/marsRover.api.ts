import axios from 'axios';
import { RoverImage } from '../common/types';

interface PhotoResponse {
  photos: RoverImage[];
}

interface LatestPhotoResponse {
  latest_photos: RoverImage[];
}

const key = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/',
  params: { api_key: key },
});

export async function getAllImages() {
  const res = await instance.get<PhotoResponse>('photos', {
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

export async function getLatestImages() {
  const res = await instance.get<LatestPhotoResponse>('latest_photos', {});
  if (res.status === 200) {
    return res.data.latest_photos;
  } else {
    return [];
  }
}
