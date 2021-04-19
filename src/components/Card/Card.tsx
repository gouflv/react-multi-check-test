import React, {FC, memo} from 'react';
import styled from 'styled-components';
import {View, ViewProps} from '../View/View';

type CardProps = ViewProps & {
  title?: string;
};

export const Card: FC<CardProps> = memo((props) => {
  const {title, children, ...wrapperProps} = props;
  return (
    <CardWrapper {...wrapperProps}>
      {title && (
        <CardHeader as={'h2'} data-testid={'card-header'}>
          {title}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
});

Card.displayName = 'Card';

const CardWrapper = styled(View)`
  background-color: #f1f1f1;
`;

const CardHeader = styled(View)`
  margin: 0;
  padding: 0 8px;
  height: 30px;
  justify-content: center;
  font-size: inherit;
  background-color: #ccc;
`;

const CardContent = styled(View)`
  padding: 8px;
`;
