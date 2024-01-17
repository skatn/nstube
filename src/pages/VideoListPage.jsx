import React, { useEffect, useState } from 'react';
import Video from '../components/video/Video';
import styles from './VideoList.module.css';
import getVideoList from '../services/video/getVideoList';
import getChannelList from '../services/channel/getChannelList';
import { combineVideoListChannelList } from '../utils/combineVideoListChannelList';

export default function VideoListPage() {
  const [videoList, setVideoList] = useState(initValue);

  useEffect(() => {
    getVideos().then((videoList) => {
      setVideoList(videoList);
    });
  }, []);

  return (
    <ul className={styles.container}>
      {videoList.items.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </ul>
  );
}

async function getVideos() {
  const videoList = await getVideoList();
  const channeIds = videoList.items.map((video) => video.snippet.channelId);
  const channelList = await getChannelList(channeIds);

  return combineVideoListChannelList(videoList, channelList);
}

const initValue = {
  items: [],
};
