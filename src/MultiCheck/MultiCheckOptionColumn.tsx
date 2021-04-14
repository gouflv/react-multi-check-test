import styled from 'styled-components';
import {View} from '../components/View/View';

const MultiCheckOptionColumn = styled(View)`
  flex: 1;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

MultiCheckOptionColumn.displayName = 'MultiCheckOptionColumn';

export default MultiCheckOptionColumn;
