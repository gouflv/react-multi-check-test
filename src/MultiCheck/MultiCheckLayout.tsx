import styled from 'styled-components';
import {View} from '../components/View/View';

export const MultiCheckLayout = styled(View)<{
  columns?: number;
}>`
  flex: 1;
  //display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns || 1}, 1fr)`};
  grid-auto-flow: column;
  grid-row-gap: 12px;
  grid-column-gap: 24px;
`;
