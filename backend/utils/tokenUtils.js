export const estimateTokens = (text) => {
    return text.split(/\s+/).length;
  };
  
  export const trimConversationToTokenLimit = (messages, limit = 8000) => {
    let totalTokens = 0;
    let trimmedMessages = [];
  
    for(let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if(totalTokens + message.tokens <= limit) {
        trimmedMessages.unshift(message);
        totalTokens += message.tokens;
      } else {
        break;
      }
    }
    return trimmedMessages;
  };