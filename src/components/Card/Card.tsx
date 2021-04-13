import React, {FC} from 'react';
import styled from 'styled-components';
import {prop} from '../../utils/styled-helper';
import {View} from '../View/View';

type CardWrapperProps = {width?: string; height?: string};

type CardProps = {
  title: string;
  wrapperProps?: CardWrapperProps;
};

export const Card: FC<CardProps> = (props) => {
  return (
    <CardWrapper {...props.wrapperProps}>
      <CardHeader>{props.title}</CardHeader>
      <CardContent>{props.children}</CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled(View)<CardWrapperProps>`
  width: ${prop<CardWrapperProps>('width', 'auto')};
  height: ${prop<CardWrapperProps>('height', 'auto')};
  box-sizing: content-box;
  background-color: #f1f1f1;
`;

const CardHeader = styled(View)`
  padding: 0 8px;
  height: 30px;
  justify-content: center;
  background-color: #ccc;
`;

const CardContent = styled(View)`
  padding: 8px;
`;
