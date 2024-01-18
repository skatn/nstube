import React from 'react';
import styles from './Comment.module.css';
import timeForToday from '../../utils/timeForToday';
import { PiThumbsUpLight } from 'react-icons/pi';
import { PiThumbsDownLight } from 'react-icons/pi';

export default function Comment({ comment }) {
  const {
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    textOriginal,
    likeCount,
  } = comment.snippet.topLevelComment.snippet;

  return (
    <li className={styles.container}>
      <img
        className={styles.profile}
        src={authorProfileImageUrl}
        alt='authorProfileImage'
      />
      <div className={styles.content}>
        <div className={styles.title}>
          <span>{authorDisplayName}</span>
          <span>{timeForToday(publishedAt)}</span>
        </div>
        <p className={styles.text}>{textOriginal}</p>
        <div className={styles.meta}>
          <button>
            <PiThumbsUpLight size='22' />
          </button>
          <span>{likeCount > 0 && likeCount}</span>
          <button>
            <PiThumbsDownLight size='22' />
          </button>
        </div>
      </div>
    </li>
  );
}
