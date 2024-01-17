import React from 'react';

export default function VideoPlayer({ videoId }) {
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
