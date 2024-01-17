import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Watch() {
  const params = new URLSearchParams(useLocation().search);
  const videoId = params.get('v');

  return (
    <div>
      <iframe
        id='player'
        type='text/html'
        width='640'
        height='390'
        src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder='0'
        allowFullScreen
      ></iframe>
    </div>
  );
}
