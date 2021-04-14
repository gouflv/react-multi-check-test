import styled from 'styled-components';
import {prop} from '../../utils/styled-helpers';

export type ViewProps = {
  flex?: string;
  flexDirection?: 'row' | 'column';
  width?: string;
  height?: string;
};

export const View = styled.div<ViewProps>`
  display: flex;
  min-width: 0;
  min-height: 0;
  flex: ${prop('flex', 'initial')};
  flex-direction: ${prop('flexDirection', 'column')};
`;
