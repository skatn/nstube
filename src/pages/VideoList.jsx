import React, { useEffect, useState } from 'react';
import Video from '../components/video/Video';
import styles from './VideoList.module.css';
import getVideoList from '../services/video/getVideoList';

export default function VideoList() {
  const [videoList, setVideoList] = useState(initValue);

  useEffect(() => {
    getVideoList().then((videoList) => {
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

const initValue = {
  items: [],
};
