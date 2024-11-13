import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

function Youtube(videoId: any) {
    return <YoutubePlayer height={300} play={false} videoId={videoId.videoId} />;
}
export default Youtube;
