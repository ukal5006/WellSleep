import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

function Exampage() {
    return (
        <View>
            <YoutubePlayer height={300} play={false} videoId={'dQw4w9WgXcQ'} />
            <YoutubePlayer height={300} play={false} videoId={'dQw4w9WgXcQ'} />
            <YoutubePlayer height={300} play={false} videoId={'dQw4w9WgXcQ'} />
        </View>
    );
}
export default Exampage;
