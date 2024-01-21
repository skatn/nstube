export default function combineVideoListChannelList(videoList, channelList) {
  videoList.items = videoList.items.map((video) => ({
    ...video,
    channel: channelList.items.find(
      (channel) => channel.id === video.snippet.channelId
    ),
  }));

  return videoList;
}
