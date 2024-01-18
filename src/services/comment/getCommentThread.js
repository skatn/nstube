import axios from 'axios';

const host = process.env.REACT_APP_HOST;
const key = process.env.REACT_APP_USER_KEY;
const useMock = process.env.REACT_APP_USE_MOCK === '1';

export default async function getCommentThread(videoId) {
  if (useMock) {
    return await (await fetch('/data/comment-thread.json')).json();
  }

  return (
    await axios.get(`${host}/commentThreads`, {
      params: {
        part: 'snippet',
        videoId: videoId,
        key,
      },
    })
  ).data;
}
