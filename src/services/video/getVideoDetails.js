import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;
const useMock = process.env.REACT_APP_USE_MOCK === '1';

export default async function getVideoDetails(videoIds) {
  if (useMock) {
    const video = await (await fetch('/data/video-details.json')).json();
    return video.items;
  }

  return (
    await axios.get(`${host}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        maxResults: videoIds.length,
        key,
      },
    })
  ).data.items;
}
