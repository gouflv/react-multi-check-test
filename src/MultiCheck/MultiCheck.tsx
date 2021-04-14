import React from 'react';
import {Card} from '../components/Card/Card';
import {useChunks} from '../hooks/useChunks';
import './MultiCheck.css';
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
  const {chunks} = useChunks(props.options, props.columns);
  return (
    <div className='MultiCheck'>
      <Card title={props.label || 'Status'} wrapperProps={{width: '320px'}}>
        <MultiCheckPanel flexDirection={'row'}>
          {chunks.map((chunk, i) => (
            <MultiCheckOptionColumn key={i}>
              {chunk.map((option) => (
                <MultiCheckOption key={option.value} data={option} />
              ))}
            </MultiCheckOptionColumn>
          ))}
        </MultiCheckPanel>
      </Card>
    </div>
  );
};

export default MultiCheck;
