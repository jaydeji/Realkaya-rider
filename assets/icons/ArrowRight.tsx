import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ArrowRightIcon = (props: SvgProps) => (
  <Svg width={10} height={16} fill="none" {...props}>
    <Path
      d="M0 13.714 6.25 8 0 2.286 1.25 0 10 8l-8.75 8L0 13.714Z"
      fill="#A7A7A7"
    />
  </Svg>
);
