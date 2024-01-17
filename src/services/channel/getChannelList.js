import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;

export default async function getChannelList(channelIds) {
  //   const channelList = await (
  //     await axios.get(`${host}/channels`, {
  //       params: {
  //         part: 'snippet,contentDetails,statistics',
  //         id: channelIds.join(','),
  //         maxResults: channelIds.length,
  //         key,
  //       },
  //     })
  //   ).data;

  const channelList = await (await fetch('/data/channel-list.json')).json();
  return channelList;
}
