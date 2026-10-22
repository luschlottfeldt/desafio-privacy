import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Action = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
