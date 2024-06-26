import { ElevenLabsClient } from 'elevenlabs';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export const createAudioFileFromText = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: "Rachel",
        model_id: "eleven_turbo_v2",
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const filePath = path.join(process.env.AUDIO_DIR, fileName);
      const fileStream = createWriteStream(filePath);

      audio.pipe(fileStream);   
      fileStream.on("finish", () => resolve(`/audio/${fileName}`));
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};