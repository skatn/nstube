import React, { useEffect, useState } from 'react';
import getVideoList from '../../services/video/getVideoList';
import Loading from '../loading/Loading';
import RecommandVideo from './RecommandVideo';
import styles from './RecommandList.module.css';
import useIntersect from '../../hooks/useIntersect';

export default function RecommandList({ videoId, isMobile }) {
  const [videoList, setVideoList] = useState();
  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    getVideoList(videoList.pageInfo.nextPageToken).then((videoList) =>
      setVideoList((prev) => ({
        ...videoList,
        items: [...prev.items, ...videoList.items],
      }))
    );
  });

  const handleClick = () => {
    getVideoList(videoList.pageInfo.nextPageToken).then((videoList) =>
      setVideoList((prev) => ({
        ...videoList,
        items: [...prev.items, ...videoList.items],
      }))
    );
  };

  useEffect(() => {
    getVideoList().then((videoList) => setVideoList(videoList));
  }, []);

  if (!videoList) return <Loading />;

  return (
    <>
      {isMobile && (
        <ul className={styles.container}>
          {videoList.items.map((video) => (
            <RecommandVideo key={video.id} video={video} />
          ))}
          <button className={styles.more} onClick={handleClick}>
            더보기
          </button>
        </ul>
      )}

      {!isMobile && (
        <ul className={styles.container}>
          {videoList.items.map((video, idx) =>
            idx + 1 === videoList.items.length ? (
              <RecommandVideo key={video.id} video={video} ref={ref} />
            ) : (
              <RecommandVideo key={video.id} video={video} />
            )
          )}
        </ul>
      )}
    </>
  );
}
