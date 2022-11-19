import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckMarkIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm4.335 8.31a.909.909 0 1 0-1.397-1.165l-3.909 4.69-2.023-2.023a.91.91 0 0 0-1.285 1.285l2.727 2.728a.908.908 0 0 0 1.341-.061l4.546-5.455Z"
      fill="#3094CC"
    />
  </Svg>
);
