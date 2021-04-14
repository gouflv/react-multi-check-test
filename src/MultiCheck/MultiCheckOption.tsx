import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import {View} from '../components/View/View';
import {Option} from './MultiCheck';

const MultiCheckOption: FC<{
  data: Option;
  checked: boolean;
  onChange: (checked: boolean, option: Option) => void;
}> = memo((props) => {
  const [checked, set] = useState(false);

  useEffect(() => {
    if (props.checked !== checked) {
      set(props.checked);
    }
  }, [checked, props.checked]);

  return (
    <StyledOption>
      <input
        id={props.data.value}
        type={'checkbox'}
        checked={checked}
        onChange={(e) => props.onChange(e.target.checked, props.data)}
      />
      <label htmlFor={props.data.value}>{props.data.label}</label>
    </StyledOption>
  );
});

MultiCheckOption.displayName = 'MultiCheckOption';

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

export default MultiCheckOption;
