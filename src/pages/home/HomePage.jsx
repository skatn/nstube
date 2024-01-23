import React from 'react';
import Video from '../../components/video/Video';
import styles from './HomePage.module.css';
import getVideoList from '../../services/video/getVideoList';
import getChannelList from '../../services/channel/getChannelList';
import combineVideoListChannelList from '../../utils/combineVideoListChannelList';
import Loading from '../../components/loading/Loading';
import useIntersect from '../../hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function VideoListPage() {
  const {
    data: videoList,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getVideos,
    getNextPageParam: (lastPage, pages) => lastPage.nextPageToken,
  });

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    fetchNextPage();
  });

  if (isLoading) return <Loading />;

  return (
    <ul className={styles.container}>
      {videoList.pages.map((page, i) =>
        page.items.map((video, idx) =>
          i + 1 === videoList.pages.length && idx + 1 === page.items.length ? (
            <Video key={video.id} video={video} ref={ref} />
          ) : (
            <Video key={video.id} video={video} />
          )
        )
      )}
    </ul>
  );
}

async function getVideos({ pageParam }) {
  const videoList = await getVideoList(pageParam);
  const channeIds = videoList.items.map((video) => video.snippet.channelId);
  const channelList = await getChannelList(channeIds);

  return combineVideoListChannelList(videoList, channelList);
}
