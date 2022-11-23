import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CalendarIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M7 11h2v2H7v-2Zm0 4h2v2H7v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Z"
      fill="#555B6A"
    />
    <Path
      d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2ZM19 8l.001 12H5V8h14Z"
      fill="#555B6A"
    />
  </Svg>
);
