import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Card} from '../components/Card/Card';
import useChunk from '../hooks/useChunk';
import MultiCheckOption from './MultiCheckOption';
import MultiCheckOptionColumn from './MultiCheckOptionColumn';
import MultiCheckPanel from './MultiCheckPanel';

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {chunks} = useChunk(props.options, props.columns);

  /**
   * Local state of checked-values
   */
  const [values, setValues] = useState(props.values || []);
  useEffect(() => {
    if (Array.isArray(props.values)) {
      // TODO compare props.values and values
      setValues(props.values);
    }
  }, [props.values]);

  /**
   * CheckedOptions reactivity from local values
   */
  const checkedOptions = useMemo(() => {
    return props.options.filter((option) => {
      if (!Array.isArray(values)) {
        return false;
      }
      return values.find((value) => value === option.value);
    });
  }, [props.options, values]);

  /**
   * Return check state for MultiCheckOption
   */
  const isChecked = useCallback(
    (option: Option) => {
      return !!checkedOptions.find((checkedOption) => checkedOption === option);
    },
    [checkedOptions]
  );

  /**
   * MultiCheckOption Change Event handler
   *
   * trigger local checked-values update only
   *
   * effect chain:
   *   [values update] -> [checkedOptions update] -> [call props.onChange]
   */
  const onOptionChange = useCallback(
    (checked: boolean, option: Option) => {
      const newValues = [...values];
      if (checked) {
        newValues.push(option.value);
      }
      setValues(newValues);
    },
    [values]
  );

  /**
   *
   */
  useEffect(() => {
    if (!props.onChange) {
      return;
    }
    // props.onChange(checkedOptions);
  }, [checkedOptions, props]);

  return (
    <div className='MultiCheck'>
      <Card title={props.label || 'Status'} wrapperProps={{width: '320px'}}>
        <MultiCheckPanel flexDirection={'row'}>
          {chunks.map((chunk, i) => (
            <MultiCheckOptionColumn key={i}>
              {chunk.map((option) => (
                <MultiCheckOption
                  key={option.value}
                  data={option}
                  checked={isChecked(option)}
                  onChange={onOptionChange}
                />
              ))}
            </MultiCheckOptionColumn>
          ))}
        </MultiCheckPanel>
      </Card>
    </div>
  );
};

export default MultiCheck;
