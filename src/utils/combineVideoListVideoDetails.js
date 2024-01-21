export default function combineVideoListVideoDetails(videoList, videoDetails) {
  videoList.items = videoList.items.map((video) =>
    videoDetails.find((v) => v.id === video.id.videoId)
  );

  return videoList;
}
