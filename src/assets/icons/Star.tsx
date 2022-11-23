import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const StarIcon = ({
  filled,
  ...props
}: SvgProps & { filled?: boolean }) => (
  <Svg width={22} height={21} fill="none" {...props}>
    <Path
      d="m11 1.13 2.956 5.988.116.235.259.038 6.594.986-4.773 4.62-.19.185.045.26 1.137 6.596-5.911-3.108-.233-.122-.233.122-5.911 3.108 1.137-6.596.045-.26-.19-.184-4.773-4.621 6.594-.986.259-.038.116-.235L11 1.13Z"
      stroke="#FFCA28"
      fill={filled ? '#FFCA28' : 'none'}
    />
  </Svg>
);
