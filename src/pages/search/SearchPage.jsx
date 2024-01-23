import React from 'react';
import { useLocation } from 'react-router-dom';
import getChannelList from '../../services/channel/getChannelList';
import combineVideoListChannelList from '../../utils/combineVideoListChannelList';
import Loading from '../../components/loading/Loading';
import searchVideoList from '../../services/video/searchVideoList';
import SearchVideo from '../../components/search/SearchVideo';
import styles from './SearchPage.module.css';
import combineVideoListVideoDetails from '../../utils/combineVideoListVideoDetails';
import getVideoDetails from '../../services/video/getVideoDetails';
import useIntersect from '../../hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function SearchPage() {
  const params = new URLSearchParams(useLocation().search);
  const searchQuery = params.get('search_query');

  const {
    data: videoList,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['searchList', searchQuery],
    queryFn: (pageParam) => searchVideos(searchQuery, pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextPageToken,
  });

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    fetchNextPage();
  });

  if (isLoading) return <Loading />;

  return (
    <ul className={styles.container}>
      {videoList.pages.map((page, pageIndex) =>
        page.items.map((video, videoIndex) =>
          pageIndex + 1 === videoList.pages.length &&
          videoIndex + 1 === page.items.length ? (
            <SearchVideo key={video.id} video={video} ref={ref} />
          ) : (
            <SearchVideo key={video.id} video={video} />
          )
        )
      )}
    </ul>
  );
}

async function searchVideos(searchQuery, pageToken) {
  let videoList = await searchVideoList(searchQuery, pageToken);
  const videoDetails = await getVideoDetails(
    videoList.items.map((v) => v.id.videoId)
  );

  videoList = combineVideoListVideoDetails(videoList, videoDetails);
  const channeIds = videoList.items.map((video) => video.snippet.channelId);
  const channelList = await getChannelList(channeIds);

  return combineVideoListChannelList(videoList, channelList);
}
