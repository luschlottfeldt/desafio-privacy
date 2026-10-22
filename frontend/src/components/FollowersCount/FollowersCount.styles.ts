import styled, { keyframes } from 'styled-components';

const tick = keyframes`
  from {
    transform: translateY(0.12em);
    opacity: 0.4;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Wrapper = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: ${({ theme }) => theme.spacing.sm};
`;

export const Value = styled.span`
  display: inline-block;
  font-size: clamp(4rem, 22vw, 7.5rem);
  font-weight: 800;
  font-stretch: 75%;
  font-variant-numeric: tabular-nums;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.primary};
  animation: ${tick} 260ms ease-out;
`;

export const Label = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;
