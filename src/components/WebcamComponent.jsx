import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, X, Maximize2, Minimize2 } from 'lucide-react';

const WebcamComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState({ width: 320, height: 240 });
  const webcamRef = useRef(null);
  const dragRef = useRef(null);

  const handleUserMedia = useCallback(() => {
    setIsWebcamReady(true);
  }, []);

  const captureScreenshot = useCallback(() => {
    if (webcamRef.current && isWebcamReady) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('Screenshot captured:', imageSrc);
      // You can handle the captured image here (e.g., save it or display it)
    } else {
      console.error('Webcam is not ready');
    }
  }, [isWebcamReady]);

  const toggleWebcam = () => setIsOpen(!isOpen);

  const handleMouseDown = (e) => {
    if (dragRef.current && dragRef.current.contains(e.target)) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({
          x: position.x + e.movementX,
          y: position.y + e.movementY,
        });
      }
    },
    [isDragging, position]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen, handleMouseMove]);

  const increaseSize = () => {
    setSize((prevSize) => ({
      width: prevSize.width * 1.2,
      height: prevSize.height * 1.2,
    }));
  };

  const decreaseSize = () => {
    setSize((prevSize) => ({
      width: Math.max(160, prevSize.width * 0.8),
      height: Math.max(120, prevSize.height * 0.8),
    }));
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleWebcam}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <Camera size={24} />
      </button>

      {isOpen && (
        <div
          ref={dragRef}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
          }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          onMouseDown={handleMouseDown}
        >
          <div className="cursor-move bg-gray-200 p-2 flex justify-between items-center">
            <span className="text-sm font-semibold">Webcam</span>
            <div className="flex space-x-2">
              <button onClick={decreaseSize} className="text-gray-600 hover:text-gray-800">
                <Minimize2 size={16} />
              </button>
              <button onClick={increaseSize} className="text-gray-600 hover:text-gray-800">
                <Maximize2 size={16} />
              </button>
              <button onClick={toggleWebcam} className="text-gray-600 hover:text-gray-800">
                <X size={16} />
              </button>
            </div>
          </div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            onUserMedia={handleUserMedia}
            className="w-full h-full"
          />
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <button
              onClick={captureScreenshot}
              disabled={!isWebcamReady}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
            >
              <Camera size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;