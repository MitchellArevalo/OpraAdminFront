import React, { createContext } from 'react';
export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  // const endpoint = 'https://backendopra.onrender.com';
  const endpoint = 'http://localhost:8083';

  return (
    <ApiContext.Provider value={endpoint}>
      {children}
    </ApiContext.Provider>
  );
};