import React, { useEffect, useState } from 'react';
import getVideoDetails from '../../services/video/getVideoDetails';
import getChannelList from '../../services/channel/getChannelList';
import numberToKorean from '../../utils/numberToKorean';
import timeForToday from '../../utils/timeForToday';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ videoId, className }) {
  const [video, setVideo] = useState(initValue);
  const [channel, setChannel] = useState(initChannel);

  useEffect(() => {
    async function fetchData() {
      const video = await getVideoDetails(videoId);
      const channel = await getChannelList([video.snippet.channelId]);

      setVideo(video);
      setChannel(channel.items[0]);
    }

    fetchData();
  }, []);

  return (
    <div className={className}>
      <div className={styles.videoContainer}>
        <iframe
          id='player'
          type='text/html'
          src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameborder='0'
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <h3 className={styles.title}>{video.snippet.title}</h3>
        <div className={styles.channel}>
          <img
            className={styles.profile}
            src={channel.snippet.thumbnails.default.url}
            alt='channel profile'
          />
          <div className={styles.meta}>
            <span>{channel.snippet.title}</span>
            <span>{`구독자 ${numberToKorean(
              channel.statistics.subscriberCount
            )}명`}</span>
          </div>
        </div>
        <div className={styles.description}>
          <div>{`조회수 ${numberToKorean(
            video.statistics.viewCount
          )}회 ${timeForToday(video.snippet.publishedAt)}`}</div>
          <div>{video.snippet.description}</div>
        </div>
      </div>
    </div>
  );
}

const initValue = {
  id: '4a2R4GN73MU',
  snippet: {
    publishedAt: '2024-01-16T02:29:01Z',
    channelId: 'UCN5XdqTDRbyjXPF5NXUqWdA',
    title: '대체 왜 이렇게 루머가 많은 거야 현정아ㅠㅠㅠ❤️',
    description:
      "현정아 앞으로 너무 다 잘 될 일 밖에 없는 거야! 사랑한다.\n\n#고현정 #요정식탁 #정재형\n\n\n\n▼ Copy and Paste ▼\n🎧 Track Info \nTitle : absence    \n￼\n • [𝙸𝚝'𝚜 𝙵𝚁𝙴𝙴]  - 𝖆𝖇𝖘𝖊𝖓𝖈𝖊, 사극&동양풍, 저작권없는...  \nMusic by 𝙂𝙚𝙩𝙎𝙤𝙢𝙚 ♪ : https://url.kr/9hadcy",
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/4a2R4GN73MU/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/4a2R4GN73MU/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/4a2R4GN73MU/hqdefault.jpg',
        width: 480,
        height: 360,
      },
      standard: {
        url: 'https://i.ytimg.com/vi/4a2R4GN73MU/sddefault.jpg',
        width: 640,
        height: 480,
      },
      maxres: {
        url: 'https://i.ytimg.com/vi/4a2R4GN73MU/maxresdefault.jpg',
        width: 1280,
        height: 720,
      },
    },
    channelTitle: '요정재형',
  },
  contentDetails: {
    duration: 'PT45M54S',
    dimension: '2d',
    definition: 'hd',
    caption: 'false',
    licensedContent: true,
    contentRating: {},
    projection: 'rectangular',
  },
  statistics: {
    viewCount: '2252908',
    likeCount: '59409',
    favoriteCount: '0',
    commentCount: '7209',
  },
};

const initChannel = {
  kind: 'youtube#channel',
  etag: 'L9KsgO-sDGOxsF1piTYNLXusfww',
  id: 'UCy-swBYpRZx7KW11FStjTgw',
  snippet: {
    title: '레알예능 스브스',
    description:
      '레알예능 스브스는 SBS의 관찰 예능 등 버라이어티 프로그램들의 명장면들을 모은 채널 입니다. \n\n[미운우리새끼], [동상이몽 2], [돌싱포맨] 등의 엑기스를 모아 놓은 "예능맛집" 컨텐츠를 보실 수 있습니다!\n구독자분들의 많은 사랑 부탁드립니다❣🙇‍♀️🙇‍♂️\n\n▶ Partnership & Sales inquiry: contentspartner@sbs.co.kr\nⓒSBS. Corp ALL RIGHTS RESERVED',
    customUrl: '@realityenter_sbs',
    publishedAt: '2011-03-22T03:57:14Z',
    thumbnails: {
      default: {
        url: 'https://yt3.ggpht.com/ytc/AIf8zZREASDwgXAb8JrxvUKwughZsxaxz5bJpnPzTefx6w=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/ytc/AIf8zZREASDwgXAb8JrxvUKwughZsxaxz5bJpnPzTefx6w=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/ytc/AIf8zZREASDwgXAb8JrxvUKwughZsxaxz5bJpnPzTefx6w=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    localized: {
      title: '레알예능 스브스',
      description:
        '레알예능 스브스는 SBS의 관찰 예능 등 버라이어티 프로그램들의 명장면들을 모은 채널 입니다. \n\n[미운우리새끼], [동상이몽 2], [돌싱포맨] 등의 엑기스를 모아 놓은 "예능맛집" 컨텐츠를 보실 수 있습니다!\n구독자분들의 많은 사랑 부탁드립니다❣🙇‍♀️🙇‍♂️\n\n▶ Partnership & Sales inquiry: contentspartner@sbs.co.kr\nⓒSBS. Corp ALL RIGHTS RESERVED',
    },
  },
  contentDetails: {
    relatedPlaylists: {
      likes: '',
      uploads: 'UUy-swBYpRZx7KW11FStjTgw',
    },
  },
  statistics: {
    viewCount: '1076011715',
    subscriberCount: '720000',
    hiddenSubscriberCount: false,
    videoCount: '14840',
  },
};
