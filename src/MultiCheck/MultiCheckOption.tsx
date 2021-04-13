import React, {FC} from 'react';
import styled from 'styled-components';
import {View} from '../components/View/View';
import {Option} from './MultiCheck';

export const MultiCheckOption: FC<{data: Option}> = (props) => {
  return (
    <StyledOption>
      <input id={props.data.value} type={'checkbox'} />
      <label htmlFor={props.data.value}>{props.data.label}</label>
    </StyledOption>
  );
};

const StyledOption = styled(View)`
  flex-direction: row;
  align-items: center;
  input {
    flex: 0 0 auto;
    margin: 0;
    width: 18px;
    height: 18px;
  }
  label {
    margin-left: 4px;
  }
`;
