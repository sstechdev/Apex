import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));
app.use(express.json());

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.AUDIO_DIR = path.join(__dirname, 'audio');
app.use('/audio', express.static(process.env.AUDIO_DIR));

app.use('/api', chatRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});