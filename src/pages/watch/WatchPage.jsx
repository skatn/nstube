import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/watch/VideoPlayer';
import styles from './WatchPage.module.css';
import Loading from '../../components/loading/Loading';
import getVideoDetails from '../../services/video/getVideoDetails';
import getChannelList from '../../services/channel/getChannelList';
import CommentList from '../../components/comment/CommentList';
import RecommandList from '../../components/recommand/RecommandList';

export default function WatchPage() {
  const params = new URLSearchParams(useLocation().search);
  const videoId = params.get('v');

  const [video, setVideo] = useState();
  const [channel, setChannel] = useState();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleMQuery = (e) => {
    setIsMobile(e.matches);
  };

  useEffect(() => {
    async function fetchData() {
      const video = (await getVideoDetails([videoId]))[0];
      const channel = await getChannelList([video.snippet.channelId]);

      setVideo(video);
      setChannel(channel.items[0]);
    }

    fetchData();
    window.scrollTo(0, 0);

    let mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', handleMQuery);
    return () => mediaQuery.removeEventListener('change', handleMQuery);
  }, [videoId]);

  if (!video || !channel) return <Loading />;

  return (
    <div className={styles.container}>
      {!isMobile && (
        <>
          <div className={styles.left}>
            <VideoPlayer video={video} channel={channel} />
            <CommentList
              videoId={videoId}
              totalCount={Number(video.statistics.commentCount)}
            />
          </div>
          <div className={styles.right}>
            <RecommandList videoId={videoId} />
          </div>
        </>
      )}

      {isMobile && (
        <>
          <VideoPlayer video={video} channel={channel} />
          <RecommandList videoId={videoId} isMobile={isMobile} />
          <CommentList
            videoId={videoId}
            totalCount={Number(video.statistics.commentCount)}
          />
        </>
      )}
    </div>
  );
}
