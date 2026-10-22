import { Link } from 'react-router';
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: clamp(2.5rem, 12vw, 3.5rem);
  font-weight: 800;
  font-stretch: 80%;
  line-height: 1;
  letter-spacing: -0.03em;
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CreatorLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 72px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Name = styled.span`
  flex: 1;
`;
