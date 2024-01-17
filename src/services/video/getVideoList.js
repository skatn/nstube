import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;

export default async function getVideoList() {
  // const videoList = (
  //   await axios.get(`${host}/videos`, {
  //     params: {
  //       part: 'snippet,statistics',
  //       chart: 'mostPopular',
  //       regionCode: 'KR',
  //       maxResults: 30,
  //       key,
  //     },
  //   })
  // ).data;

  // return videoList;

  const videoList = await (await fetch('/data/video-list-popular.json')).json();
  return videoList;
}
