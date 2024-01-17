import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../components/watch/VideoPlayer';

export default function WatchPage() {
  const params = new URLSearchParams(useLocation().search);
  const videoId = params.get('v');

  return (
    <div>
      <VideoPlayer videoId={videoId} />
    </div>
  );
}
