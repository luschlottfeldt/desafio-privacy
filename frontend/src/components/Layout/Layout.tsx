import type { ReactNode } from 'react';
import { Main, TopBar, Wrapper } from './Layout.styles';

type LayoutProps = {
  topBar?: ReactNode;
  children: ReactNode;
};

export function Layout({ topBar, children }: LayoutProps) {
  return (
    <Wrapper>
      {topBar && <TopBar>{topBar}</TopBar>}
      <Main>{children}</Main>
    </Wrapper>
  );
}
