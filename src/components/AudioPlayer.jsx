import React, { useState, useRef } from 'react';

function AudioPlayer({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center m-2 ">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-zinc-950 text-zinc-400"
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

export default AudioPlayer;