import React, {memo, useCallback, useMemo} from 'react';
import {Card} from '../components/Card/Card';
import useChunk from '../hooks/useChunk';
import useSet from '../hooks/useSet';
import {useUpdateEffect} from '../hooks/useUpdateEffect';
import {isArrayEqual} from '../utils/array/isArrayEqual/isArrayEqual';
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
export type MultiCheckProps = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

function createSelectAllOption() {
  const option: Option = {
    label: 'Select All',
    value: 'SelectAll'
  };
  Object.defineProperty(option, 'isSelectAll', {
    value: true
  });
  return option;
}

function isSelectAllOption(option: Option) {
  return 'isSelectAll' in option;
}

const selectAllOption = createSelectAllOption();

const MultiCheck: React.FunctionComponent<MultiCheckProps> = memo(
  (props): JSX.Element => {
    /**
     * Computed chunked options from props.options
     */
    const options = useMemo(() => {
      if (!props.options.length) return [];
      return [selectAllOption, ...props.options];
    }, [props.options]);

    const chunks = useChunk(options, props.columns);

    /**
     * Checked option values, initial default checked value from props.values
     */
    const [
      checkedValue,
      {
        add: addCheckedValue,
        remove: removeCheckedValue,
        set: setCheckedValue,
        has: hasCheckedValue
      }
    ] = useSet(new Set<string>(props.values || []));

    /**
     * Update checkedValue when props.values changed
     */
    useUpdateEffect(() => {
      props.values && setCheckedValue(props.values);
    }, [props.values]);

    /**
     * Computed checked options depend on checkedValue
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
     *
     * should not trigger onChange if checkValue is equal with props.values
     */
    useUpdateEffect(() => {
      if (!props.onChange) {
        return;
      }

      if (isArrayEqual(props.values || [], Array.from(checkedValue))) {
        return;
      }

      props.onChange(checkedOptions);
    }, [props.onChange, props.values, checkedValue, checkedOptions]);

    /**
     * SelectAllOption state
     */
    const isAllChecked = useMemo(() => {
      return checkedValue.size === props.options.length;
    }, [checkedValue.size, props.options.length]);

    const onSelectAllOptionChange = useCallback(
      (checked: boolean) => {
        setCheckedValue(
          checked ? props.options.map((option) => option.value) : []
        );
      },
      [props.options, setCheckedValue]
    );

    return (
      <div className='MultiCheck'>
        <Card title={props.label} width={'320px'}>
          <MultiCheckPanel flexDirection={'row'}>
            {chunks.map((chunk, i) => (
              <MultiCheckOptionColumn key={i}>
                {chunk.map((option) =>
                  isSelectAllOption(option) ? (
                    <MultiCheckOption
                      key={option.value}
                      option={option}
                      checked={isAllChecked}
                      onChange={onSelectAllOptionChange}
                    />
                  ) : (
                    <MultiCheckOption
                      key={option.value}
                      option={option}
                      checked={isChecked(option)}
                      onChange={onOptionChange}
                    />
                  )
                )}
              </MultiCheckOptionColumn>
            ))}
          </MultiCheckPanel>
        </Card>
      </div>
    );
  }
);

MultiCheck.defaultProps = {
  columns: 1
};

MultiCheck.displayName = 'MultiCheck';

export default MultiCheck;
