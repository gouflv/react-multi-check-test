import React, {FC, memo} from 'react';
import styled from 'styled-components';
import {View, ViewProps} from '../View/View';

type CardProps = {
  title: string;
  wrapperProps?: ViewProps;
};

export const Card: FC<CardProps> = memo((props) => {
  return (
    <CardWrapper {...props.wrapperProps}>
      <CardHeader>{props.title}</CardHeader>
      <CardContent>{props.children}</CardContent>
    </CardWrapper>
  );
});

Card.displayName = 'Card';

const CardWrapper = styled(View)`
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
