import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import theme from '../theme';

type Props = Partial<HTMLInputElement> & {
  placeholder?: string;
  onChange?(e: any): void;
  ref?: Ref<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  return <WrapperInput ref={ref} placeholder={props.placeholder} onChange={props.onChange} />;
});

const WrapperInput = styled.input`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};
`;

export default Input;
