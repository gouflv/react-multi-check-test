import React from 'react';
import {Card} from '../components/Card/Card';
import './MultiCheck.css';
import {MultiCheckLayout} from './MultiCheckLayout';
import {MultiCheckOption} from './MultiCheckOption';

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
  return (
    <div className='MultiCheck'>
      <Card title={'Status'} wrapperProps={{width: '320px'}}>
        <MultiCheckLayout columns={props.columns}>
          {props.options.map((option) => (
            <MultiCheckOption key={option.value} data={option} />
          ))}
        </MultiCheckLayout>
      </Card>
    </div>
  );
};

export default MultiCheck;
