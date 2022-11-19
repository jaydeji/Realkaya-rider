import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Back = (props: SvgProps) => (
  <Svg width={10} height={16} fill="none" {...props}>
    <Path
      d="M10 2.286 3.75 8 10 13.714 8.75 16 0 8l8.75-8L10 2.286Z"
      fill="#02092A"
    />
  </Svg>
);
