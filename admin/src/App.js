import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";
function App() {
  const [closedNav, setClosedNav] = useState(false);
  const toggleNav = () => {
    setClosedNav(!closedNav);
  }
  const getNavWidth = () => closedNav ? 'w-16' : 'w-56';
  return (
    <div className="flex">
      <div className={getNavWidth() + " h-screen bg-red-100 transition-width"}></div>
      <div className="flex-1 min-h-screen bg-blue-100">
        <button onClick={toggleNav}>
        { closedNav  ? (<AiOutlineMenuUnfold size={25}/>) : (
          <AiOutlineMenuFold size={25} />
        ) } 
        </button>
      </div>

    </div>
  )
}

export default App;

