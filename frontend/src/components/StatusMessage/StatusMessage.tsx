import type { ReactNode } from 'react';
import { Action, Description, Title, Wrapper } from './StatusMessage.styles';

type StatusMessageProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function StatusMessage({
  title,
  description,
  action,
}: StatusMessageProps) {
  return (
    <Wrapper role="status">
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <Action>{action}</Action>}
    </Wrapper>
  );
}
