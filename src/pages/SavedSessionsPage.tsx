import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PlayArrow, Delete } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { getSavedSessions, deleteSession } from '../services/sessionStorage';

interface SavedSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  audioUrl: string;
}

const SavedSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<SavedSession | null>(null);

  useEffect(() => {
    const loadSessions = () => {
      const savedSessions = getSavedSessions();
      setSessions(savedSessions);
    };

    loadSessions();
  }, []);

  const handleDelete = (session: SavedSession) => {
    setSessionToDelete(session);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete.id);
      setSessions(sessions.filter(s => s.id !== sessionToDelete.id));
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4, direction: dir }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t.savedSessions}
        </Typography>
        {sessions.length === 0 ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t.noSavedSessions}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/sessions')}
              sx={{ mt: 2 }}
            >
              {t.createFirstSession}
            </Button>
          </Box>
        ) : (
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {session.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t.created}: {formatDate(session.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t.duration}: {session.duration} {t.minutes}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrow />}
                        onClick={() => window.open(session.audioUrl)}
                      >
                        {t.play}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(session)}
                      >
                        {t.delete}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/sessions')}
          sx={{ mt: 4 }}
        >
          {t.backToSessions}
        </Button>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {t.confirmDelete}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t.deleteSessionConfirm}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t.cancel}
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            {t.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SavedSessionsPage; 