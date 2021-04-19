import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {View} from '../components/View/View';
import {Option} from './MultiCheck';
import {v4 as uuid} from 'uuid';

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

  const inputId = useMemo(() => {
    return `multi-check-option-${props.option.value}-${uuid()}`;
  }, [props.option.value]);

  return (
    <StyledOption>
      <input
        id={inputId}
        type={'checkbox'}
        checked={checked}
        onChange={(e) => props.onChange(e.target.checked, props.option)}
      />
      <label htmlFor={inputId}>{props.option.label}</label>
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
