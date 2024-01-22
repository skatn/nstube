import React, { forwardRef } from 'react';
import styles from './RecommandVideo.module.css';
import { Link } from 'react-router-dom';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import getThumbnail from '../../utils/getThumbnail';

const RecommandVideo = forwardRef(({ video }, ref) => {
  const { thumbnails, title, publishedAt, channelTitle } = video.snippet;
  const { viewCount } = video.statistics;

  return (
    <li ref={ref}>
      <Link to={`/watch?v=${video.id}`}>
        <div className={styles.container}>
          <img
            className={styles.thumbnail}
            src={getThumbnail(thumbnails).url}
            alt='thumbnails'
          />
          <div className={styles.text}>
            <span className={styles.title}>{title}</span>
            <span className={styles.channelTitle}>{channelTitle}</span>
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

export default RecommandVideo;
