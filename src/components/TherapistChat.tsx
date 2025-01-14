import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TherapistChatProps {
  sessionType: string;
  onScriptGenerated: (script: string) => void;
}

const TherapistChat: React.FC<TherapistChatProps> = ({ sessionType, onScriptGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI hypnotherapist. I see you're interested in a ${sessionType} session. 
      Before we begin, I'd like to understand your specific needs and goals. What brings you here today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an experienced, empathetic hypnotherapist conducting an initial consultation 
              for a ${sessionType} hypnosis session. Ask relevant questions to understand the client's needs. 
              After gathering sufficient information about their concerns, ask if they're ready to begin the session.
              Once they confirm readiness, provide brief preparation instructions and ask for final confirmation.
              Keep responses concise and focused.`,
            },
            ...messages,
            userMessage,
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantMessage = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

      // Check if the user has confirmed they're ready and comfortable
      if (userMessage.content.toLowerCase().includes('yes') || 
          userMessage.content.toLowerCase().includes('ok') || 
          userMessage.content.toLowerCase().includes('ready')) {
        if (assistantMessage.toLowerCase().includes('close your eyes') || 
            assistantMessage.toLowerCase().includes('comfortable')) {
          setIsReady(true);
        }
      }

    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateScript = async () => {
    setIsLoading(true);
    setIsSessionStarted(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an experienced hypnotherapist creating a brief test hypnosis script.
              Create a 2-3 minute session following these guidelines:
              
              1. Voice and Pacing:
                - Use [PAUSE] for 2-second pauses
                - Use [LONG_PAUSE] for 4-second pauses
                - Add emphasis with *asterisks*
                
              2. Quick Structure (30-45 seconds each):
                - Brief relaxation with 2-3 breaths
                - One simple metaphor or visualization
                - 2-3 key therapeutic suggestions
                - Quick awakening
                
              3. Language:
                - Keep it simple but hypnotic
                - Use calming imagery
                - Speak in present tense
                
              Keep the entire script concise but effective.`,
            },
            {
              role: 'user',
              content: `Create a short test hypnosis script for ${sessionType}.
              Client background: ${JSON.stringify(messages)}
              
              Requirements:
              - Keep it under 3 minutes
              - Focus on one main therapeutic suggestion
              - Use simple, effective language
              - Include breathing cues
              
              Format:
              - [PAUSE] for 2-second pauses
              - [LONG_PAUSE] for 4-second pauses
              - *asterisks* for emphasis
              - New lines between sections`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const script = response.data.choices[0].message.content;
      onScriptGenerated(script);
    } catch (error) {
      console.error('Error generating script:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'I apologize, but I encountered an error generating your script.' },
      ]);
      setIsSessionStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Chat with Your AI Hypnotherapist
      </Typography>

      <List sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ flexDirection: 'column', alignItems: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                maxWidth: '80%',
                bgcolor: message.role === 'user' ? 'primary.light' : 'grey.100',
                color: message.role === 'user' ? 'white' : 'text.primary',
              }}
            >
              <ListItemText primary={message.content} />
            </Paper>
          </ListItem>
        ))}
        {isLoading && (
          <ListItem>
            <CircularProgress size={20} />
          </ListItem>
        )}
      </List>

      {!isSessionStarted && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            placeholder="Type your message..."
          />
          {isReady ? (
            <Button
              variant="contained"
              color="primary"
              onClick={generateScript}
              disabled={isLoading}
            >
              Begin Session
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              <SendIcon />
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default TherapistChat; 