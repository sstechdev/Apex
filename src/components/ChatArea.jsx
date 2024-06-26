import React from 'react';
import { Oval } from 'react-loader-spinner';
import AudioPlayer from './AudioPlayer';

function ChatArea({ messages, messagesEndRef, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-4 max-w-3xl mx-auto w-full">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.isUser ? 'justify-start' : 'justify-end'}`}>
          {!msg.isUser && msg.audioUrl && (
            <AudioPlayer audioUrl={msg.audioUrl} />
          )}
          <div className={`max-w-[70%] rounded-lg p-3 ${msg.isUser ? 'bg-black text-zinc-200' : 'bg-black text-zinc-200'}`}>
            <p className='border border-zinc-800 p-2  rounded-xl'>{msg.text}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-center">
          <Oval color="#606060" height={33} width={33} />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatArea;