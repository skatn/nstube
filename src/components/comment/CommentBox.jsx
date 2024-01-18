import React, { useEffect, useState } from 'react';
import styles from './CommentBox.module.css';
import getCommentThread from '../../services/comment/getCommentThread';
import Loading from '../loading/Loading';
import Comment from './Comment';

export default function CommentBox({ videoId, totalCount, className }) {
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    getCommentThread(videoId).then((commentList) =>
      setCommentList(commentList)
    );
  }, [videoId]);

  if (!commentList)
    return (
      <div className={className}>
        <Loading />
      </div>
    );

  return (
    <div className={className}>
      <h3 className={styles.title}>
        댓글 {totalCount.toLocaleString('ko-KR')}개
      </h3>
      <ul>
        {commentList.items.map((comment) => (
          <Comment comment={comment} />
        ))}
      </ul>
    </div>
  );
}
