import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SearchIcon = (props: SvgProps) => (
  <Svg width={15} height={15} fill="none" {...props}>
    <Path
      d="M6.415 12.829a6.376 6.376 0 0 0 3.926-1.354L13.866 15 15 13.866l-3.525-3.524a6.376 6.376 0 0 0 1.354-3.928A6.422 6.422 0 0 0 6.415 0 6.422 6.422 0 0 0 0 6.414a6.422 6.422 0 0 0 6.415 6.415Zm0-11.225a4.816 4.816 0 0 1 4.81 4.81 4.816 4.816 0 0 1-4.81 4.811 4.816 4.816 0 0 1-4.811-4.81 4.816 4.816 0 0 1 4.81-4.811Z"
      fill="#555B6A"
    />
  </Svg>
);

export { SearchIcon };
