/**
 * useStaggeredAnimation — fades + slides in a list of items with a stagger delay.
 * Usage:
 *   const getAnimStyle = useStaggeredAnimation(items.length);
 *   <Animated.View style={getAnimStyle(index)}> ... </Animated.View>
 */

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useStaggeredAnimation(
  count: number,
  options: { delay?: number; duration?: number; stagger?: number } = {},
) {
  const { delay = 0, duration = 280, stagger = 50 } = options;
  const anims = useRef<Animated.Value[]>([]);

  // Initialise anims array (always same length as count)
  if (anims.current.length !== count) {
    anims.current = Array.from({ length: count }, () => new Animated.Value(0));
  }

  useEffect(() => {
    const animations = anims.current.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration,
        delay: delay + i * stagger,
        useNativeDriver: true,
      }),
    );
    Animated.parallel(animations).start();
  }, [count, delay, duration, stagger]);

  const getAnimStyle = (index: number) => {
    const anim = anims.current[index] ?? new Animated.Value(1);
    return {
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 0],
          }),
        },
      ],
    };
  };

  return getAnimStyle;
}
