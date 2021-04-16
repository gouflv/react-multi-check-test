import React, {memo, useCallback, useMemo} from 'react';
import {Card} from '../components/Card/Card';
import useChunk from '../hooks/useChunk';
import useSet from '../hooks/useSet';
import {useUpdateEffect} from '../hooks/useUpdateEffect';
import MultiCheckOption from './MultiCheckOption';
import MultiCheckOptionColumn from './MultiCheckOptionColumn';
import MultiCheckPanel from './MultiCheckPanel';

export type Option = {
  label: string;
  value: string;
};

/**
 * MultiCheck
 *
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

const MultiCheck: React.FunctionComponent<Props> = memo(
  (props): JSX.Element => {
    const chunks = useChunk(props.options, props.columns);

    /**
     * Checked option values, initial with default checked value from props
     */
    const [
      checkedValue,
      {add: addCheckedValue, remove: removeCheckedValue, has: hasCheckedValue}
    ] = useSet(new Set<string>(props.values || []));

    /**
     * Computed memoized checked options depend on checkedValue
     */
    const checkedOptions = useMemo(() => {
      return props.options.filter((option) => hasCheckedValue(option.value));
    }, [hasCheckedValue, props.options]);

    /**
     * Return check state for MultiCheckOption
     */
    const isChecked = useCallback(
      (option: Option) => {
        return !!checkedOptions.find(
          (checkedOption) => checkedOption === option
        );
      },
      [checkedOptions]
    );

    /**
     * MultiCheckOption change event handler, will update local checkedValues
     */
    const onOptionChange = useCallback(
      (checked: boolean, option: Option) => {
        if (checked) {
          addCheckedValue(option.value);
        } else {
          removeCheckedValue(option.value);
        }
      },
      [addCheckedValue, removeCheckedValue]
    );

    /**
     * Trigger onChange event when checkedValue update
     */
    useUpdateEffect(() => {
      if (!props.onChange) {
        return;
      }
      props.onChange(checkedOptions);
    }, [checkedValue]);

    return (
      <div className='MultiCheck'>
        <Card title={props.label} width={'320px'}>
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
  }
);

MultiCheck.defaultProps = {
  label: 'Status',
  columns: 1
};

MultiCheck.displayName = 'MultiCheck';

export default MultiCheck;
