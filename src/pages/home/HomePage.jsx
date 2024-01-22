import React, { useEffect, useState } from 'react';
import Video from '../../components/video/Video';
import styles from './HomePage.module.css';
import getVideoList from '../../services/video/getVideoList';
import getChannelList from '../../services/channel/getChannelList';
import combineVideoListChannelList from '../../utils/combineVideoListChannelList';
import Loading from '../../components/loading/Loading';
import useIntersect from '../../hooks/useIntersect';

export default function VideoListPage() {
  const [videoList, setVideoList] = useState();

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    getVideos(videoList.pageInfo.pageToken).then((videoList) => {
      setVideoList((prev) => ({
        ...prev,
        items: [...prev.items, ...videoList.items],
      }));
    });
  });

  useEffect(() => {
    getVideos().then((videoList) => {
      setVideoList(videoList);
      console.log(videoList.items[0]);
    });
  }, []);

  if (!videoList) return <Loading />;

  return (
    <ul className={styles.container}>
      {videoList.items.map((video, idx) =>
        idx + 1 === videoList.items.length ? (
          <Video key={video.id} video={video} ref={ref} />
        ) : (
          <Video key={video.id} video={video} />
        )
      )}
    </ul>
  );
}

async function getVideos(pageToken) {
  const videoList = await getVideoList(pageToken);
  const channeIds = videoList.items.map((video) => video.snippet.channelId);
  const channelList = await getChannelList(channeIds);

  return combineVideoListChannelList(videoList, channelList);
}
