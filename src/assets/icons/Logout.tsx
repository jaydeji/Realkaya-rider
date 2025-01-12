import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Logout = (props: SvgProps) => (
  <Svg height={21} viewBox="0 96 960 960" width={21} {...props}>
    <Path
      d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"
      fill="#F7F7F7"
    />
  </Svg>
);

export { Logout };
