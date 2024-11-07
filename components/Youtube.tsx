import React from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

function Youtube(videoId: string) {
    return (
        <View>
            <YoutubePlayer height={300} play={false} videoId={videoId} />
        </View>
    );
}
export default Youtube;
