import React from 'react';
import { Span } from 'components/Span';

export const Step = ({ step }: { step: number }) => {
  return (
    <Span textClass="text-xs text-light-text font-Mulish-Medium">
      Step <Span textClass="text-main-blue">{step}</Span> of 4
    </Span>
  );
};
