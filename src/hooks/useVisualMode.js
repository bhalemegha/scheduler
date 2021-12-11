import { useState } from "react";
export default function useVisualMode(start) {
  const [mode, setMode] = useState(start);
  function transition(newMode) {
    setMode(newMode);
  }
    return { mode, transition};
}