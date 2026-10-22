import styled from 'styled-components';

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.25rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;
