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
