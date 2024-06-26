import React from 'react';

const models = [
  { id: 'gemma-7b-it', name: 'Gemma-7b-It', description: 'Family of lightweight, state-of-the-art language models from Google, with open weights, and pre-trained variants.' },
  { id: 'llama3-70b-8192', name: 'Llama3-70b-8192', description: 'The 70B parameter version of Metas Llama model delivers state of the art performance.' },
  { id: 'llama3-8b-8192', name: 'Llama3-8b-8192', description: 'The 8B parameter version of Metas Llama model delivers compelling performance at best in class speed and price.' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral-8x7b-32768', description: 'A high-quality sparse mixture of experts model (SMoE) with open weights that handles a context of 32K tokens.' },
];

export default function ModelSelector({ selectedModel, onModelChange }) {
  return (
    <select 
      value={selectedModel} 
      onChange={(e) => onModelChange(e.target.value)}
      className="bg-black hover:bg-white hover:text-black text-gray-300 rounded-full p-2 border border-zinc-700 cursor-pointer"
    >
      {models.map(model => (
        <option
        key={model.id} 
        value={model.id}
        >{model.name}
        </option>
      ))}
    </select>
  );
}

