import React, { useEffect, useState } from 'react';
import styles from './CommentList.module.css';
import getCommentThread from '../../services/comment/getCommentThread';
import Loading from '../loading/Loading';
import Comment from './Comment';
import useIntersect from '../../hooks/useIntersect';

export default function CommentList({ videoId, totalCount }) {
  const [commentList, setCommentList] = useState();
  const ref = useIntersect((entry, observer) => {
    console.log('하이');
    observer.unobserve(entry.target);
    getCommentThread(videoId, commentList.nextPageToken).then((commentList) =>
      setCommentList((prev) => ({
        ...commentList,
        items: [...prev.items, ...commentList.items],
      }))
    );
  });

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
        {commentList.items.map((comment, idx) =>
          idx + 1 === commentList.items.length ? (
            <Comment key={comment.id} comment={comment} ref={ref} />
          ) : (
            <Comment key={comment.id} comment={comment} />
          )
        )}
      </ul>
    </div>
  );
}
