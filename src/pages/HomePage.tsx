import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <LanguageSelector />
      </Box>
      <Paper 
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          direction: dir
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 4 }}>
          {t.appName}
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          {t.tagline}
        </Typography>
        <Typography variant="body1" sx={{ mb: 6 }}>
          {t.appDescription}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/sessions')}
            sx={{ minWidth: 200 }}
          >
            {t.startNewSession}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/saved-sessions')}
            sx={{ minWidth: 200 }}
          >
            {t.viewSavedSessions}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 4, opacity: 0.7 }}>
          {t.disclaimer}
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage; 