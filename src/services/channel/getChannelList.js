import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;
const useMock = process.env.REACT_APP_USE_MOCK === '1';

export default async function getChannelList(channelIds) {
  if (useMock) {
    // return await (await fetch('/data/channel-list.json')).json();
    return await (await fetch('/data/channel-list-홍구.json')).json();
  }

  return await (
    await axios.get(`${host}/channels`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: channelIds.join(','),
        maxResults: channelIds.length,
        key,
      },
    })
  ).data;
}
