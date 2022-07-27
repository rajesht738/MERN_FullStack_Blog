import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
function App() {
  return (
   <div className="flex">
    <div className="w-56 h-screen bg-red-100"></div>
    <div className="flex-1 min-h-screen bg-blue-100">
    <button ><AiOutlineMenuFold size={25}/></button>
    </div>
  
   </div>
  )
}

export default App;

