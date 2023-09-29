import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

const AnimatedMic: React.FC = () => {
  const [show, setShow] = useState(false);
  const opacity = useSharedValue(0);

  const opacityMicAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {duration: 400}),
      99999999999,
      true,
    );
  }, [opacity]);

  return (
    <Animated.View style={opacityMicAnimation}>
      <Icon name="mic" size={24} color="#EF1212" />
    </Animated.View>
  );
};

export default AnimatedMic;
