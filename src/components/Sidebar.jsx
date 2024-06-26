import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";

function Sidebar({ isSidebarOpen, conversations, startNewConversation, loadConversation }) {
  return (
    <div className={`flex flex-col bg-black w-56 p-2 rounded border border-zinc-800 ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <button onClick={startNewConversation} className="rounded-full text-white m-2 mb-4 flex items-center justify-center">
        <AiOutlinePlus className="" /> 
      </button>
      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
        {conversations.map(conv => (
          <div key={conv._id} onClick={() => loadConversation(conv._id)} className="bg-zinc-950 hover:bg-zinc-900 p-2 m-2 rounded-lg text-white cursor-pointer">
            {conv.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;