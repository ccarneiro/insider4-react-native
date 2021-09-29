import axios from 'axios';

const key = process.env.API_KEY;

// https://api.themoviedb.org/3/movie/now_playing?api_key=57f913c79dd3a407b3216f13b85219d9

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: key },
});

export default api;
