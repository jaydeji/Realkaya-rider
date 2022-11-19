import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Tip = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      d="M8 0c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8Zm1.13 9.38.35-6.46H6.52l.35 6.46h2.26Zm-.09 3.36c.24-.23.37-.55.37-.96 0-.42-.12-.74-.36-.97-.24-.23-.59-.35-1.06-.35-.47 0-.82.12-1.07.35-.25.23-.37.55-.37.97 0 .41.13.73.38.96.26.23.61.34 1.06.34.45 0 .8-.11 1.05-.34Z"
      fill="#3094CC"
    />
  </Svg>
);
