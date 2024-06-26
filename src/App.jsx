import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import TokenCounter from './components/TokenCounter';
import MessageInput from './components/MessageInput';



function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [totalTokens, setTotalTokens] = useState(0);
  const [selectedModel, setSelectedModel] = useState('llama3-8b-8192');
  const[isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const response = await fetch('http://localhost:5000/api/conversations');
    const data = await response.json();
    setConversations(data);
  };

  const getFirstFewWords = (text) => {
    if (!text) return 'New Conversation';
    const words = text.split(' ');
    return words.slice(0, 3).join(' ') + (words.lenght > 3 ? '...': '');
  }

  const loadConversation = async (id) => {
    const response = await fetch(`http://localhost:5000/api/conversation/${id}`);
    const data = await response.json();
    setMessages(data.messages);
    setCurrentConversationId(id);
    setTotalTokens(data.totalTokens || 0);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //Gemini image capture processing
  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setMessage('Analize this image');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !capturedImage) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: message, isUser: true, image: capturedImage }]);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          conversationId: currentConversationId,
          model: selectedModel,
          imageData: capturedImage
        }),
      });

      const data = await response.json();
      
      

      setTotalTokens(data.totalTokens);

      setMessages(prev => [...prev, { 
        text: data.text, 
        isUser: false,
        audioUrl: `http://localhost:5000${data.audio}`
      }]);

      if (!currentConversationId) {
        setCurrentConversationId(data.conversationId);
        fetchConversations();
      }

      scrollToBottom();

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      setCapturedImage(null);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setTotalTokens(0);
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        conversations={conversations}
        startNewConversation={startNewConversation}
        loadConversation={loadConversation}
      />
      
      <div className="flex-1 flex flex-col">
      
        <Header 
          toggleSidebar={toggleSidebar}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

      

        <ChatArea 
          messages={messages}
          messagesEndRef={messagesEndRef}
          isLoading={isLoading}
        />
       
        
        <MessageInput 
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          
        />
        <TokenCounter totalTokens={totalTokens} />
        

      </div>
    </div>
  );
}

export default App;