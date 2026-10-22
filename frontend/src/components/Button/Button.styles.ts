import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0 0 0 1.5px ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primarySoft};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primarySoft};
    }
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 48px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease;
  ${({ $variant }) => variants[$variant]}

  &:disabled {
    cursor: progress;
    opacity: 0.6;
  }
`;
