import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/watch/VideoPlayer';
import styles from './WatchPage.module.css';
import Loading from '../../components/loading/Loading';
import getVideoDetails from '../../services/video/getVideoDetails';
import getChannelList from '../../services/channel/getChannelList';
import CommentBox from '../../components/comment/CommentBox';

export default function WatchPage() {
  const params = new URLSearchParams(useLocation().search);
  const videoId = params.get('v');

  const [video, setVideo] = useState();
  const [channel, setChannel] = useState();

  useEffect(() => {
    async function fetchData() {
      const video = await getVideoDetails(videoId);
      const channel = await getChannelList([video.snippet.channelId]);

      setVideo(video);
      setChannel(channel.items[0]);
    }

    fetchData();
  }, [videoId]);

  if (!video || !channel) return <Loading />;

  return (
    <div className={styles.container}>
      <VideoPlayer video={video} channel={channel} />
      <div className={styles.recommand}>관련 동영상</div>
      <CommentBox
        className={styles.comment}
        videoId={videoId}
        totalCount={Number(video.statistics.commentCount)}
      />
    </div>
  );
}
