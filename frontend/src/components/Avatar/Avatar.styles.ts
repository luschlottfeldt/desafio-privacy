import styled, { css } from 'styled-components';

export type AvatarSize = 'sm' | 'md' | 'lg';

const sizes = {
  sm: css`
    width: 32px;
    height: 32px;
    border-radius: 10px;
    font-size: 0.8125rem;
  `,
  md: css`
    width: 44px;
    height: 44px;
    border-radius: 14px;
    font-size: 1rem;
  `,
  lg: css`
    width: 88px;
    height: 88px;
    border-radius: 28px;
    font-size: 2rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 112px;
      height: 112px;
      border-radius: 34px;
      font-size: 2.5rem;
    }
  `,
};

export const Monogram = styled.span<{ $size: AvatarSize }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-stretch: 85%;
  letter-spacing: -0.02em;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  ${({ $size }) => sizes[$size]}
`;
