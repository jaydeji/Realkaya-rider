import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const BatteryIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Circle cx={15} cy={15} r={15} fill="#3094CC" fillOpacity={0.2} />
    <Path
      d="M18.394 8.125h1.856a.75.75 0 0 1 .75.75V21.25a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75V8.875a.75.75 0 0 1 .75-.75h2.625V9.25h5.25V8.125h.769Z"
      stroke="#030919"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M12.375 7h5.25v2.25h-5.25V7ZM16.125 12.625l-3 3h3.752l-3.002 3"
      stroke="#030919"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
