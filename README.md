# HypnoJourney 🌟

A modern web application that delivers personalized hypnotherapy sessions through AI-generated scripts and voice synthesis. Built with React, TypeScript, and Material-UI.

## Features ✨

- 🎯 Personalized hypnotherapy sessions
- 💬 Interactive AI chat interface
- 🗣️ High-quality voice synthesis using ElevenLabs
- 🌍 Multilingual support (English, French, Arabic)
- 💾 Session saving and management
- 📱 Responsive design for all devices

## Prerequisites 📋

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/Akanichi/Hypno.git
cd Hypno
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure 📁

```
src/
├── components/        # Reusable components
├── contexts/         # React contexts
├── pages/           # Page components
├── services/        # API and utility services
└── App.tsx          # Main application component
```

## Available Scripts 📝

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used 🛠️

- React
- TypeScript
- Material-UI
- OpenAI API
- ElevenLabs API
- React Router
- Web Audio API

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Safety Notice ⚠️

This application is for demonstration purposes only and is not a substitute for professional medical treatment or therapy. The AI-generated content and voices are intended for experimental use only.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- OpenAI for the GPT API
- ElevenLabs for the voice synthesis API
- Material-UI for the component library 