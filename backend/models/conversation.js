import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: String,
  isUser: Boolean,
  audioUrl: String,
  tokens: Number
});

const ConversationSchema = new mongoose.Schema({
  name: String,
  messages: [MessageSchema],
  totalTokens: Number,
  model: String
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;