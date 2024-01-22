import React, { useEffect, useState } from 'react';
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

export default function SearchPage() {
  const params = new URLSearchParams(useLocation().search);
  const searchQuery = params.get('search_query');

  const [videoList, setVideoList] = useState();

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    searchVideos(searchQuery, videoList.nextPageToken).then((videoList) => {
      setVideoList((prev) => ({
        ...videoList,
        items: [...prev.items, ...videoList.items],
      }));
    });
  });

  useEffect(() => {
    searchVideos(searchQuery).then((videoList) => {
      setVideoList(videoList);
    });
  }, [searchQuery]);

  if (!videoList) return <Loading />;

  return (
    <ul className={styles.container}>
      {videoList.items.map((video, idx) =>
        idx + 1 === videoList.items.length ? (
          <SearchVideo key={video.id} video={video} ref={ref} />
        ) : (
          <SearchVideo key={video.id} video={video} />
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
