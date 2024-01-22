import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;
const useMock = process.env.REACT_APP_USE_MOCK === '1';

export default async function getVideoList(pageToken) {
  if (useMock) {
    return await (await fetch('/data/video-list-popular.json')).json();
  }

  return (
    await axios.get(`${host}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'KR',
        maxResults: 30,
        pageToken,
        key,
      },
    })
  ).data;
}
