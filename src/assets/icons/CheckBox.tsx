import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckBoxFilledIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      d="M0 3.065A3.064 3.064 0 0 1 3.065 0h9.87A3.064 3.064 0 0 1 16 3.065v9.87A3.064 3.064 0 0 1 12.935 16h-9.87A3.065 3.065 0 0 1 0 12.935v-9.87Zm12.405 2.482a.572.572 0 1 0-.81-.809l-5.31 5.311-1.88-1.882a.572.572 0 1 0-.81.809l2.286 2.286a.572.572 0 0 0 .81 0l5.714-5.715Z"
      fill="#2FA94E"
    />
  </Svg>
);
