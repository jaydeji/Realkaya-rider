import React from 'react';
import { Span } from './Span';

export const Step = ({ step }: { step: number }) => {
  return (
    <Span textClass="text-xs text-light-text font-Mulish-Medium">
      Step {step} of 4
    </Span>
  );
};
