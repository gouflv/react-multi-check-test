import React, {useCallback, useEffect, useMemo} from 'react';
import {Card} from '../components/Card/Card';
import useChunk from '../hooks/useChunk';
import useSet from '../hooks/useSet';
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
   * Checked option values, initial with default checked value from props
   */
  const {value: checkedValue, actions: checkedValueActions} = useSet(
    new Set<string>(props.values || [])
  );

  /**
   * Computed checked options depend on checkedValue
   */
  const checkedOptions = useMemo(() => {
    return props.options.filter((option) =>
      checkedValueActions.has(option.value)
    );
  }, [checkedValueActions, props.options]);

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
   * MultiCheckOption change event handler
   *
   * Update local checkedValues only, and will run an effect chain:
   *   [checkedValue update] -> [checkedOptions update] -> [call props.onChange]
   */
  const onOptionChange = useCallback(
    (checked: boolean, option: Option) => {
      if (checked) {
        checkedValueActions.add(option.value);
      } else {
        checkedValueActions.remove(option.value);
      }
    },
    [checkedValueActions]
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
                  option={option}
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
