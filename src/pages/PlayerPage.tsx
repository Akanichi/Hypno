import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, IconButton, Slider, Button, CircularProgress, Alert, TextField, Paper } from '@mui/material';
import { PlayArrow, Pause, Stop, VolumeUp, Send } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { generateHypnosisScript } from '../services/openai';
import { generateAudio } from '../services/elevenlabs';
import { saveSession } from '../services/sessionStorage';

interface Progress {
  stage: string;
  percentage: number;
}

interface Message {
  text: string;
  isUser: boolean;
}

const PlayerPage: React.FC = () => {
  const { sessionId = '' } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isChatComplete, setIsChatComplete] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      navigate('/sessions');
      return;
    }

    // Initialize chat with welcome message
    setMessages([{ text: t.chatWelcome, isUser: false }]);

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [sessionId, navigate, t, audioUrl]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response based on conversation stage
    const messageCount = messages.length;
    let aiResponse: Message;

    switch (messageCount) {
      case 1: // After user's first message
        aiResponse = {
          text: "I understand how you're feeling. Would you like to tell me more about what brings you here today?",
          isUser: false
        };
        break;
      case 3: // After user's second message
        aiResponse = {
          text: "I can help you with that. Before we begin the session, is there anything specific you'd like me to focus on during the hypnosis?",
          isUser: false
        };
        break;
      case 5: // After user's third message
        aiResponse = {
          text: "Thank you for sharing. I'll create a personalized hypnosis session for you. Are you ready to begin?",
          isUser: false
        };
        break;
      case 7: // After user confirms ready
        aiResponse = {
          text: t.generating,
          isUser: false
        };
        setIsChatComplete(true);
        handleScriptGeneration();
        break;
      default:
        aiResponse = {
          text: "I understand. Please tell me more.",
          isUser: false
        };
    }

    setMessages(prev => [...prev, aiResponse]);
  };

  const handleScriptGeneration = async () => {
    if (!sessionId) {
      navigate('/sessions');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Generate the hypnosis script
      setProgress({ stage: t.generatingScript, percentage: 0 });
      const script = await generateHypnosisScript(sessionId, (progress) => {
        setProgress({ stage: t.generatingScript, percentage: progress });
      });

      // Generate the audio
      setProgress({ stage: t.generatingAudio, percentage: 0 });
      const audioBlob = await generateAudio(script, (progress) => {
        setProgress({ stage: t.generatingAudio, percentage: Number(progress) });
      });

      // Clean up previous audio URL if exists
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      // Create URL for the audio blob
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Save the session
      await saveSession({
        id: sessionId,
        title: t[`${sessionId}Title` as keyof typeof t] || sessionId,
        date: new Date().toISOString(),
        duration: '0.17',
        audioUrl: url,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : t.unknownError);
    } finally {
      setIsLoading(false);
      setProgress(null);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleTimeSliderChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', direction: dir }}>
        <Typography variant="h4" gutterBottom>
          {t[`${sessionId}Title` as keyof typeof t]}
        </Typography>

        {!isChatComplete && (
          <Paper sx={{ p: 2, mb: 4, maxHeight: 400, overflow: 'auto' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    bgcolor: message.isUser ? 'primary.light' : 'grey.100'
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Paper>
              </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField
                fullWidth
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.chatPlaceholder}
              />
              <IconButton onClick={handleSendMessage} color="primary">
                <Send />
              </IconButton>
            </Box>
          </Paper>
        )}

        {isLoading && progress && (
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {progress.stage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress.percentage)}%
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {audioUrl && (
          <>
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />

            <Box sx={{ my: 4 }}>
              <Slider
                value={currentTime}
                max={duration || 100}
                onChange={handleTimeSliderChange}
                aria-label={t.progress}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">{formatTime(currentTime)}</Typography>
                <Typography variant="body2">{formatTime(duration)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
              <IconButton onClick={handlePlayPause} color="primary" size="large">
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton onClick={handleStop} color="primary" size="large">
                <Stop />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <VolumeUp />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.1}
                aria-label={t.volume}
                sx={{ maxWidth: 200 }}
              />
            </Box>
          </>
        )}

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/sessions')}
          sx={{ mt: 2 }}
        >
          {t.backToSessions}
        </Button>
      </Box>
    </Container>
  );
};

export default PlayerPage; 