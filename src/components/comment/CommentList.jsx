import React, { useEffect, useState } from 'react';
import styles from './CommentList.module.css';
import getCommentThread from '../../services/comment/getCommentThread';
import Loading from '../loading/Loading';
import Comment from './Comment';

export default function CommentBox({ videoId, totalCount }) {
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    getCommentThread(videoId).then((commentList) =>
      setCommentList(commentList)
    );
  }, [videoId]);

  if (!commentList) return <Loading />;

  return (
    <div>
      <h3 className={styles.title}>
        댓글 {totalCount.toLocaleString('ko-KR')}개
      </h3>
      <ul>
        {commentList.items.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
