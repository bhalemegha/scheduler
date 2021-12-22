import { useState } from "react";
export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  //List of all prev modes is History
  const [history, setHistory] = useState([init]);

  //replacing last history element with newmode
  const transition = function (newMode, replace=false) {
    if(replace){
      back();
    }

    setHistory(prev => ([...prev, newMode]))
    setMode(newMode);
  }

  const back = function () {
    //To prevent initial element from deleting
    if (history.length > 1) {
      const newHist = [...history];
      //It will remove top most element from History
      newHist.splice(-1);
      
      // setHistory(()=>{ return history.slice(0,history.length - 1)});
      setHistory(newHist);
      setMode(newHist[newHist.length - 1]);
    }
  }
  return { mode, transition, back };
}