import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';

type Props = {
  onRetry(): void;
};

const Error = ({ onRetry }: Props) => (
  <Root>
    <TextWrapper>Something went wrong.</TextWrapper>
    <Button onClick={onRetry}>RETRY</Button>
  </Root>
);

const Root = styled.div`
  text-align: center;
`;

const TextWrapper = styled.div`
  margin-bottom: 15px;
`;

export default Error;
