import React, { useEffect } from 'react';
import styles from './CommentList.module.css';
import getCommentThread from '../../services/comment/getCommentThread';
import Loading from '../loading/Loading';
import Comment from './Comment';
import useIntersect from '../../hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function CommentList({ videoId, totalCount }) {
  const {
    data: commentList,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['commentList', videoId],
    queryFn: ({ pageParam }) => {
      return getCommentThread(videoId, pageParam);
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextPageToken,
  });

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    fetchNextPage();
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h3 className={styles.title}>
        댓글 {totalCount.toLocaleString('ko-KR')}개
      </h3>
      <ul>
        {commentList.pages.map((page, pageIndex) =>
          page.items.map((comment, commentIndex) =>
            pageIndex + 1 === commentList.pages.length &&
            commentIndex + 1 === page.items.length ? (
              <Comment key={comment.id} comment={comment} ref={ref} />
            ) : (
              <Comment key={comment.id} comment={comment} />
            )
          )
        )}
      </ul>
    </div>
  );
}
