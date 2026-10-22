import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 560px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.lg};
  }
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 48px;
`;

export const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing.xxl};
  }
`;
