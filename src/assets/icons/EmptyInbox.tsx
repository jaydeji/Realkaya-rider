import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const EmptyInbox = (props: SvgProps) => (
  <Svg width={82} height={71} fill="none" {...props}>
    <Path
      d="M17.708 37.5 25 45.834l7.292-8.334h7.291a4.17 4.17 0 0 0 4.167-4.166v-25a4.17 4.17 0 0 0-4.167-4.167H10.417A4.17 4.17 0 0 0 6.25 8.334v25a4.17 4.17 0 0 0 4.167 4.166h7.291Zm-3.125-22.916h20.834v4.166H14.583v-4.166Zm0 8.333h14.584v4.167H14.583v-4.167Z"
      fill="#C9CCD3"
    />
    <Path
      d="M67 21H47c-8.273 0-15 6.727-15 15v32.5a2.5 2.5 0 0 0 2.5 2.5H67c8.272 0 15-6.728 15-15V36c0-8.273-6.728-15-15-15Zm-5 32.5H44.5v-5H62v5Zm7.5-10h-25v-5h25v5Z"
      fill="#E5E5E5"
    />
  </Svg>
);

export { EmptyInbox };
