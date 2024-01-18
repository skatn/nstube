import React from 'react';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ video, channel }) {
  return (
    <div>
      <div className={styles.videoContainer}>
        <iframe
          title={video.snippet.title}
          id='player'
          type='text/html'
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <h3 className={styles.title}>{video.snippet.title}</h3>
        <div className={styles.channel}>
          <img
            className={styles.profile}
            src={channel.snippet.thumbnails.default.url}
            alt='channel profile'
          />
          <div className={styles.meta}>
            <span>{channel.snippet.title}</span>
            <span>{`구독자 ${numberToKorean(
              channel.statistics.subscriberCount
            )}명`}</span>
          </div>
        </div>
        <div className={styles.description}>
          <div>{`조회수 ${numberToKorean(
            video.statistics.viewCount
          )}회 ${timeForToday(video.snippet.publishedAt)}`}</div>
          <div>{video.snippet.description}</div>
        </div>
      </div>
    </div>
  );
}
