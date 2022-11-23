import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const DoubleRightIcon = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <Path
      d="M0 13.714 6.25 8 0 2.286 1.25 0 10 8l-8.75 8L0 13.714Z"
      fill="#fff"
    />
    <Path
      d="M7 13.714 13.25 8 7 2.286 8.25 0 17 8l-8.75 8L7 13.714Z"
      fill="#fff"
    />
  </Svg>
);
