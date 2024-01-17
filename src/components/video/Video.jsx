import React from 'react';
import styles from './Video.module.css';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import { Link } from 'react-router-dom';

export default function Video({ video }) {
  const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
  const { viewCount } = video.statistics;
  return (
    <li>
      <Link to={`/watch?v=${video.id}`}>
        <img
          className={styles.thumbnail}
          src={thumbnails.standard.url}
          alt='thumbnails'
        />
        <div className={styles.description}>
          <img
            className={styles.profile}
            src={thumbnails.default.url}
            alt='channel profile'
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
}
