import React, { forwardRef } from 'react';
import styles from './Video.module.css';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import { Link } from 'react-router-dom';
import getThumbnail from '../../utils/getThumbnail';

const Video = forwardRef(({ video }, ref) => {
  const { thumbnails, title, publishedAt } = video.snippet;
  const { viewCount } = video.statistics;
  const { channel } = video;

  return (
    <li ref={ref}>
      <Link to={`/watch?v=${video.id}`}>
        <img
          className={styles.thumbnail}
          src={getThumbnail(thumbnails).url}
          alt='thumbnails'
        />
        <div className={styles.description}>
          <img
            className={styles.profile}
            src={channel.snippet.thumbnails.default.url}
            alt='channel profile'
          />
          <div className={styles.text}>
            <span className={styles.title}>{title}</span>
            <span className={styles.channelTitle}>{channel.snippet.title}</span>
            <div className={styles.meta}>
              <span>조회수 {numberToKorean(viewCount)}회</span>
              <span>•</span>
              <span>{timeForToday(publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
});

export default Video;
