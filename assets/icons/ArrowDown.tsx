import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ArrowDownIcon = (props: SvgProps) => (
  <Svg width={10} height={5} fill="none" {...props}>
    <Path d="m0 0 5 5 5-5H0Z" fill="#555B6A" />
  </Svg>
);
