import { ThemeProvider } from 'styled-components';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}
