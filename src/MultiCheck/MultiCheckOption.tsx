import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import {View} from '../components/View/View';
import {Option} from './MultiCheck';

/**
 * MultiCheck OptionProps
 * @param {Option} option
 * @param {boolean} checked - control this option check state
 * @param {Function} onChange - trigger when option check state change
 */
type OptionProps = {
  option: Option;
  checked: boolean;
  onChange: (checked: boolean, option: Option) => void;
};

const MultiCheckOption: FC<OptionProps> = memo((props) => {
  const [checked, set] = useState(false);

  useEffect(() => {
    set(props.checked);
  }, [checked, props.checked]);

  return (
    <StyledOption>
      <input
        id={props.option.value}
        type={'checkbox'}
        checked={checked}
        onChange={(e) => props.onChange(e.target.checked, props.option)}
      />
      <label htmlFor={props.option.value}>{props.option.label}</label>
    </StyledOption>
  );
});

MultiCheckOption.displayName = 'MultiCheckOption';

export default MultiCheckOption;

const StyledOption = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 2px 0;
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

StyledOption.displayName = 'StyledOption';
