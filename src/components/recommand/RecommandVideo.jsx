import React from 'react';
import styles from './RecommandVideo.module.css';
import { Link } from 'react-router-dom';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';

export default function RecommandVideo({ video }) {
  const { thumbnails, title, publishedAt, channelTitle } = video.snippet;
  const { viewCount } = video.statistics;
  console.log(video);

  return (
    <li>
      <Link to={`/watch?v=${video.id}`}>
        <div className={styles.container}>
          <img
            className={styles.thumbnail}
            src={thumbnails.standard.url}
            alt='thumbnails'
          />
          <div className={styles.description}>
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
        </div>
      </Link>
    </li>
  );
}
