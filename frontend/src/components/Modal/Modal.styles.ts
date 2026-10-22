import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Dialog = styled.dialog`
  width: 100%;
  max-width: 100%;
  max-height: 85dvh;
  margin: auto 0 0;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.lg}
    ${({ theme }) => theme.radii.lg} 0 0;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  &[open] {
    display: flex;
    flex-direction: column;
    animation: ${slideUp} 200ms ease-out;
  }

  &::backdrop {
    background: ${({ theme }) => theme.colors.overlay};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 440px;
    margin: auto;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

export const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9375rem;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

export const Body = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;
