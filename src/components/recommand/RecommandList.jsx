import React from 'react';
import getVideoList from '../../services/video/getVideoList';
import Loading from '../loading/Loading';
import RecommandVideo from './RecommandVideo';
import styles from './RecommandList.module.css';
import useIntersect from '../../hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function RecommandList({ videoId, isMobile }) {
  const {
    data: videoList,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['recommandList', videoId],
    queryFn: ({ pageParam }) => getVideoList(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextPageToken,
  });

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    fetchNextPage();
  });

  const handleClick = () => {
    fetchNextPage();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {isMobile && (
        <ul className={styles.container}>
          {videoList.pages.map((page) =>
            page.items.map((video) => (
              <RecommandVideo key={video.id} video={video} />
            ))
          )}
          <button className={styles.more} onClick={handleClick}>
            더보기
          </button>
        </ul>
      )}

      {!isMobile && (
        <ul className={styles.container}>
          {videoList.pages.map((page, pageIndex) =>
            page.items.map((video, videoIndex) =>
              pageIndex + 1 === videoList.pages.length &&
              videoIndex + 1 === page.items.length ? (
                <RecommandVideo key={video.id} video={video} ref={ref} />
              ) : (
                <RecommandVideo key={video.id} video={video} />
              )
            )
          )}
        </ul>
      )}
    </>
  );
}
