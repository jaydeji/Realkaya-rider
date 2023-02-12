import { Span } from 'components/Span';
import React from 'react';
import { Order } from 'types/app';

type Props = {
  distance: Order['distance'];
};

export const OrderKilometer = ({ distance }: Props) => {
  return (
    <Span textClass="py-[6px] px-[15px] text-main-blue bg-main-blue/20 rounded-[5px] ml-[10px] font-Mulish-Bold text-[10px]">
      {(distance / 1000).toFixed(2)}km
    </Span>
  );
};
