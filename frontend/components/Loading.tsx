// import React, { useRef, useEffect } from "react";
// import styled from "styled-components/native";
// import { Animated, View, Text } from "react-native";

// const Loading = () => {
//   const circle1 = useRef(new Animated.Value(0)).current;
//   const circle2 = useRef(new Animated.Value(0)).current;
//   const circle3 = useRef(new Animated.Value(0)).current;
//   const shadow1 = useRef(new Animated.Value(0)).current;
//   const shadow2 = useRef(new Animated.Value(0)).current;
//   const shadow3 = useRef(new Animated.Value(0)).current;

//   const animate = (animatedValue: Animated.Value) => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(animatedValue, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animatedValue, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   useEffect(() => {
//     animate(circle1);
//     animate(circle2);
//     animate(circle3);
//     animate(shadow1);
//     animate(shadow2);
//     animate(shadow3);
//   }, []);

//   return (
//     <StyledWrapper>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: 60,
//         }}
//       >
//         <AnimatedCircle style={{ transform: [{ translateY: circle1 }] }} />
//         <AnimatedCircle style={{ transform: [{ translateY: circle2 }] }} />
//         <AnimatedCircle style={{ transform: [{ translateY: circle3 }] }} />
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: 60,
//         }}
//       >
//         <AnimatedShadow style={{ transform: [{ scaleX: shadow1 }] }} />
//         <AnimatedShadow style={{ transform: [{ scaleX: shadow2 }] }} />
//         <AnimatedShadow style={{ transform: [{ scaleX: shadow3 }] }} />
//       </View>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.View`
//   justify-content: center;
//   align-items: center;
//   height: 50px;
// `;

// const AnimatedCircle = styled(Animated.View)`
//   width: 8px;
//   height: 8px;
//   background-color: #ffffff;
//   border-radius: 4px;
// `;

// const AnimatedShadow = styled(Animated.View)`
//   width: 5px;
//   height: 4px;
//   background-color: rgba(0, 0, 0, 0.2);
//   border-radius: 2px;
//   margin-top: 5px;
// `;

// export default Loading;

import React from "react";
import styled from "styled-components/native";
import { Animated, View } from "react-native";

const Loading = () => {
  return (
    <StyledWrapper>
      <Container>
        {[0, 1, 2, 3].map((i) => (
          <AnimatedBlock key={i} delay={i * 200} />
        ))}
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  width: 80px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AnimatedBlock = ({ delay }: { delay: number }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 30,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue, delay]);

  const animatedStyle = {
    transform: [{ translateY: animatedValue }],
    opacity: animatedValue.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [1, 0.2, 1],
    }),
  };

  return <Block style={animatedStyle} />;
};

const Block = styled(Animated.View)`
  width: 12px;
  height: 12px;
  margin: 0 5px 5px 0;
  border-radius: 3px;
  background-color: #fff;
`;

export default Loading;
