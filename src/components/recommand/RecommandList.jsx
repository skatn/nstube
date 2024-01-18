import React, { useEffect, useState } from 'react';
import getVideoList from '../../services/video/getVideoList';
import Loading from '../loading/Loading';
import RecommandVideo from './RecommandVideo';
import styles from './RecommandList.module.css';

export default function RecommandList({ videoId }) {
  const [videoList, setVideoList] = useState();

  useEffect(() => {
    getVideoList().then((videoList) => setVideoList(videoList));
  }, []);

  if (!videoList) return <Loading />;

  return (
    <ul className={styles.container}>
      {videoList.items.map((video) => (
        <RecommandVideo key={video.id} video={video} />
      ))}
    </ul>
  );
}
