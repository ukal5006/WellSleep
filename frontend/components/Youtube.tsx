import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { View, Text } from "react-native";

function Youtube({
  videoId,
  title,
  content,
}: {
  videoId: string;
  title: string;
  content: string;
}) {
  //   console.log("Video ID:", videoId);

  return (
    <View>
      <YoutubePlayer height={220} play={false} videoId={videoId} />
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        {title}
        {/* The Nutcracker Act II Scene 12: The Final Waltz and Apotheosis - The New
        York City Ballet */}
      </Text>
      {/* <Text style={{ color: "white", fontSize: 16, marginTop: 10 }}>
        {content}
      </Text> */}
    </View>
  );
}

export default Youtube;
