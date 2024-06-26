import React from 'react';
import { FaBars } from "react-icons/fa";
import ModelSelector from './ModelSelector';

function Header({ toggleSidebar, selectedModel, setSelectedModel }) {
  return (
    <div className="bg-black p-1 rounded-md flex items-center justify-between border-solid border border-zinc-800">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-zinc-300 mr-4 m-2 px-4">
          <FaBars />
        </button>
        <h1 className=" text-2xl text-center font-semibold text-zinc-300">A</h1><h1 className='text-zinc-300 text-2xl '>pex</h1> 
        
      </div>
      <ModelSelector 
        selectedModel={selectedModel} 
        onModelChange={setSelectedModel}
      />
    </div>
  );
}

export default Header;