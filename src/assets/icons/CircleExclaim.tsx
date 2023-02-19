import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CircleExclaim = (props: SvgProps) => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Path
      d="M8.5 15.3a6.8 6.8 0 1 0 0-13.6 6.8 6.8 0 0 0 0 13.6Zm0 1.7A8.5 8.5 0 1 1 17 8.5 8.5 8.5 0 0 1 8.5 17Zm-.85-5.1h1.7v1.7h-1.7v-1.7Zm0-8.5h1.7v6.8h-1.7V3.4Z"
      fill="#F7F7F7"
    />
  </Svg>
);

export { CircleExclaim };
