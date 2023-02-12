import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const OrdersIcon = (props: SvgProps) => (
  <Svg width={17} height={20} fill="none" {...props}>
    <Path
      d="M15 2.8H2c-.552 0-1 .403-1 .9v14.4c0 .497.448.9 1 .9h13c.552 0 1-.403 1-.9V3.7c0-.497-.448-.9-1-.9Z"
      stroke="#F7F7F7"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M5.5 1v2.7M11.5 1v2.7M4.5 7.75h8M4.5 11.35h6M4.5 14.95h4"
      stroke="#F7F7F7"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default OrdersIcon;
