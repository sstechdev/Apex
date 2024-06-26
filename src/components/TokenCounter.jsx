import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";

function TokenCounter({ totalTokens }) {
  return (

      <div className='flex flex-row justify-center'>
        <p className=' text-sm text-zinc-300 px-4 py-1 text-left '>Made by: Sebastian Salgado</p>

        <a href='https://x.com/JSebastianS01'><FaSquareXTwitter className='bg-white m-1 text-xl'/></a>
      <div className=" bg-black text-zinc-400 text-sm text-right justify-end py-1 px-4">
       {totalTokens} tokens used
    </div>
      </div>
    
  
    

  );
}

export default TokenCounter;