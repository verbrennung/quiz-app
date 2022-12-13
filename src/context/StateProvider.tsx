import React, { createContext, useContext, useMemo, useState } from "react";

export const defaultSessionState = {
  score: 0,
  changeScore: (num: number) => null,
};

export const StateContext = createContext(defaultSessionState);

export function StateProvider({ children }: { children: React.ReactChild }) {
  const [score, setScore] = useState(0);
  const changeScore = (num: number) => {
    if (num === -1) {
      setScore(0);
      return;
    }
    setScore(score + num);
  };
  const values = useMemo(() => ({ score, changeScore }), [score, changeScore]);

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}

export const useStateData = () => useContext(StateContext);
