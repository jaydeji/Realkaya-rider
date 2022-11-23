import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const CallIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Circle cx={14} cy={14} r={14} fill="#6CC165" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.18 14.823c2.729 2.729 3.348-.428 5.086 1.309 1.675 1.675 2.638 2.01.516 4.132-.266.214-1.956 2.785-7.893-3.15-5.937-5.937-3.368-7.628-3.154-7.893 2.128-2.128 2.457-1.16 4.133.515 1.738 1.737-1.418 2.359 1.312 5.087Z"
      fill="#F5F4FF"
    />
  </Svg>
);
