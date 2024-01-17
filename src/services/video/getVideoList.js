import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;

export default function getVideoList() {
  //   return axios
  //     .get(`${host}/videos`, {
  //       params: {
  //         part: 'snippet,statistics',
  //         chart: 'mostPopular',
  //         regionCode: 'KR',
  //         maxResults: 30,
  //         key,
  //       },
  //     })
  //     .then((response) => response.data);

  return fetch('/data/video-list-popular.json').then((response) =>
    response.json()
  );
}
