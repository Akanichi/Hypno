import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const SessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  const sessions = [
    {
      id: 'stress-relief',
      title: t.stressReliefTitle,
      description: t.stressReliefDescription,
      duration: '20',
    },
    {
      id: 'confidence',
      title: t.confidenceTitle,
      description: t.confidenceDescription,
      duration: '25',
    },
    {
      id: 'sleep',
      title: t.sleepTitle,
      description: t.sleepDescription,
      duration: '30',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center', direction: dir }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t.chooseSession}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t.sessionPageDescription}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {sessions.map((session) => (
          <Grid item xs={12} md={4} key={session.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
                direction: dir
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {session.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
                  {session.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t.duration}: {session.duration} {t.minutes}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/player/${session.id}`)}
                >
                  {t.startSession}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          {t.backToHome}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/saved-sessions')}
        >
          {t.viewSavedSessions}
        </Button>
      </Box>
    </Container>
  );
};

export default SessionsPage; 