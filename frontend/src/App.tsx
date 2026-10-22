import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { CreatorPage } from './pages/CreatorPage/CreatorPage';
import { CreatorsPage } from './pages/CreatorsPage/CreatorsPage';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatorsPage />} />
          <Route path="/creators/:creatorId" element={<CreatorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
