import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchVideo.module.css';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import getThumbnail from '../../utils/getThumbnail';

const SearchVideo = forwardRef(({ video }, ref) => {
  const { thumbnails, title, publishedAt, channelTitle, description } =
    video.snippet;
  const { viewCount } = video.statistics;
  const { thumbnails: channelThumbnails } = video.channel.snippet;

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

            <div className={styles.meta}>
              <span>조회수 {numberToKorean(viewCount)}회</span>
              <span>•</span>
              <span>{timeForToday(publishedAt)}</span>
            </div>
            <div className={styles.channel}>
              <img src={channelThumbnails.default.url} alt='channel profile' />
              <span className={styles.channelTitle}>{channelTitle}</span>
            </div>
            <span className={styles.description}>{description}</span>
          </div>
        </div>
      </Link>
    </li>
  );
});

export default SearchVideo;
