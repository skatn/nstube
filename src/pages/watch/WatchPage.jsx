import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/watch/VideoPlayer';
import styles from './WatchPage.module.css';

export default function WatchPage() {
  const params = new URLSearchParams(useLocation().search);
  const videoId = params.get('v');

  return (
    <div className={styles.container}>
      <VideoPlayer className={styles.player} videoId={videoId} />
      <div className={styles.recommand}>관련 동영상</div>
      <div className={styles.comment}>댓글</div>
    </div>
  );
}
