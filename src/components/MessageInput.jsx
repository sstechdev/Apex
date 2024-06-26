import React, { useState } from 'react';
import { FaMicrophone, FaCamera } from "react-icons/fa";
import { IoSendOutline } from "react-icons/io5";
import WebcamComponent from './WebcamComponent';

function MessageInput({ message, setMessage, handleSubmit, 
  capturedImage, onImageCapture }) {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

  const handleImageCapture = (imageSrc) => {
    onImageCapture(imageSrc);
    setIsWebcamOpen(false);
  };

  const closeWebcam = () => {
    setIsWebcamOpen(false);
  };
  const toggleWebcam = () => {
    setIsWebcamOpen(!isWebcamOpen);
  };

  return (
    <div className="bg-black p-2 m-2 max-w-3xl mx-auto w-full rounded-full">
      {isWebcamOpen && (
        <div className="mb-2 h-40 w-40">
          <WebcamComponent onImageCapture={handleImageCapture} onClose={closeWebcam} />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        {capturedImage && (
          <div className="w-40 h-40 mr-2">
            <img src={capturedImage} alt='Captured' className='w-full h-full object-cover rounded-3xl'/>
          </div>
        )}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-zinc-950 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-700 border-solid border border-zinc-500"
          placeholder={capturedImage ? "Analyze this image" : "Type your message..."}  
        />
        
        

        
        <button type="submit" className="text-white p-2 rounded-full hover:bg-white hover:text-black">
          <IoSendOutline className="w-5 h-6" />
        </button>  
      </form>
    </div>
  );
}

export default MessageInput;