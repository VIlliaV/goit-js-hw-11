import axios from 'axios';
const END_POINT = 'https://pixabay.com/api/';
const API_KEY = '33488317-ddf10e3d9d4608ab197c27337';
const findParameters = `&image_type=photo&orientation=horizontal&safesearch=true`;
const per_page = 40;
async function searchNewPhotos(query, page = 1) {
  const Photos = await axios.get(
    `${END_POINT}/?key=${API_KEY}&q=${query}${findParameters}&page=${page}&per_page=${per_page}`
  );

  return Photos.data;
}

export { searchNewPhotos, per_page };
