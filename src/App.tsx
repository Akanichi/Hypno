import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import SessionsPage from './pages/SessionsPage';
import PlayerPage from './pages/PlayerPage';
import SavedSessionsPage from './pages/SavedSessionsPage';
import { LanguageProvider } from './contexts/LanguageContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7E57C2',
      light: '#B085F5',
      dark: '#4D2C91',
    },
    secondary: {
      main: '#66BB6A',
      light: '#98EE99',
      dark: '#338A3E',
    },
    background: {
      default: '#F5F0FF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#4A2B1C',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      letterSpacing: '0.02em',
      fontWeight: 600,
    },
    h2: {
      letterSpacing: '0.01em',
      fontWeight: 500,
    },
    body1: {
      letterSpacing: '0.03em',
      lineHeight: 1.8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/player/:sessionId" element={<PlayerPage />} />
            <Route path="/saved-sessions" element={<SavedSessionsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App; 