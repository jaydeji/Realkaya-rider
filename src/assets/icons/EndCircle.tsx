import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

export const EndCircle = (props: SvgProps) => (
  <Svg width={10} height={10} fill="none" {...props}>
    <Circle cx={5} cy={5} r={3.5} stroke="#3094CC" strokeWidth={3} />
  </Svg>
);
