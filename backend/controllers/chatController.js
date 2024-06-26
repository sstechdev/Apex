import Conversation from '../models/conversation.js';
import { createAudioFileFromText } from '../utils/audioUtils.js';
import { estimateTokens, trimConversationToTokenLimit } from '../utils/tokenUtils.js';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const chatResponse = async (req, res) => {
  const { message, conversationId, model } = req.body;
  try {
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      conversation.model = model;
    } else {
      conversation = new Conversation({ name: 'New Conversation', messages: [], totalTokens: 0, model });
    }

    const userMessageTokens = estimateTokens(message);
    conversation.messages.push({ text: message, isUser: true, tokens: userMessageTokens });
    conversation.totalTokens += userMessageTokens;

    const trimmedMessages = trimConversationToTokenLimit(conversation.messages);
    conversation.messages = trimmedMessages;
    conversation.totalTokens = trimmedMessages.reduce((sum, msg) => sum + msg.tokens, 0);

    const chatCompletion = await getGroqChatCompletion(trimmedMessages, model);
    const textResponse = chatCompletion.choices[0]?.message?.content || "";
    const responseTokens = estimateTokens(textResponse);

    const audioFilePath = await createAudioFileFromText(textResponse);
    
    conversation.messages.push({ 
      text: textResponse, 
      isUser: false,
      audioUrl: audioFilePath,
      tokens: responseTokens
    });
    conversation.totalTokens += responseTokens;

    await conversation.save();

    res.json({ 
      text: textResponse, 
      audio: audioFilePath,
      conversationId: conversation._id,
      totalTokens: conversation.totalTokens
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({}, '_id name');
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).send("Error fetching conversations");
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    res.json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).send("Error fetching conversation");
  }
};

const getGroqChatCompletion = async (messages, model) => {
  const groqMessages = messages.map(msg => ({
    role: msg.isUser ? "user" : "assistant",
    content: msg.text
  }));
  
  return groq.chat.completions.create({
    messages: groqMessages,
    model: model,
  });
};