import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;
const useMock = process.env.REACT_APP_USE_MOCK === '1';

export default async function searchVideoList(searchQuery, pageToken) {
  if (useMock) {
    return await (await fetch('/data/video-list-search.json')).json();
  }

  return (
    await axios.get(`${host}/search`, {
      params: {
        part: 'snippet',
        regionCode: 'KR',
        type: 'video',
        maxResults: 30,
        q: searchQuery,
        pageToken,
        key,
      },
    })
  ).data;
}
