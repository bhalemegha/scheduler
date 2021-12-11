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
    setHistory(prev => [...history, newMode])
    setMode(newMode);
  }

  const back = function () {
    //To prevent initial element from deleting
    if (history.length > 1) {
      //It will remove top most element from History
      history.splice(-1);
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}