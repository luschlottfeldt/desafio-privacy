import { Link } from 'react-router';
import styled from 'styled-components';

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 44px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SwitchHint = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const Profile = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Name = styled.h1`
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 280px;
  }
`;

export const ActionError = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9375rem;
`;
