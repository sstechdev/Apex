# Apex: LLM with speech responses
- Watch demo
[![Apex v0.1 Demo](/public/apex-video-thumnail.png)](https://youtu.be/dWUP4W_RbkM)



## Connect with me at
https://x.com/JSebastianS01

## Project Description

This AI-Powered full-stack web application that seamlessly integrates advanced AI technology to provide an interactive user experience. It combines rapid AI responses with the ability to verbalize these responses on command, creating an immersive chat environment.

### Key Features:

- **Lightning-Fast AI Responses**: Powered by Groq's state-of-the-art inference engine, ensuring rapid and intelligent interactions with a choice between 4 different AI models.
- **AI That Talks Back**: Integrated with ElevenLabs' Text-to-Speech API, allowing the AI to verbally communicate its responses. Experience natural, human-like speech at the click of a button.
- **Dual Interaction Modes**: Choose between reading AI responses or listening to them spoken aloud.
- **Sleek, Intuitive Interface**: Crafted with Tailwind CSS for a modern, responsive design that looks great on any device.
- **RESTful API Architecture**: Facilitates easy integration and expansion for future enhancements.
- **Responsive UI**: Seamlessly adapts to various screen sizes.
- **Intelligent Memory Allocation**: Backend logic maintains separate memory for each chat, allowing conversations to continue with prior context.

## Tech Stack

- Frontend: React with Tailwind CSS
- Backend: Node.js with Express
- Database: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- React (Vite: Javascript) 
- Tailwindcss
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sstechdev/Apex
   cd Apex
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd v0/backend
   npm install

   # Install frontend dependencies
   cd v0
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

4. Start the backend server:
   ```
   cd v0/backend
   node server.js
   ```

5. In a new terminal, start the frontend development server:
   ```
   cd v0
   npm start
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application if using Vite.

## Usage

1. Prompt the model of your choice 1/4
2. Press on the play button on the left hand side of the model response to play the audio file.
3. Open a new conversation with the + sign on the top of the side bar.
4. Go to previous conversations saved on the sidebar 

## Contributing

- We welcome contributions to improve the app.
- Please refer to the issues page of the repo to expand the app's features.

## License

MIT

## Acknowledgments

- Groq for their powerful inference engine
- ElevenLabs for their Text-to-Speech API
- All contributors and supporters of this project
