import React, { createContext } from 'react';
export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const endpoint = 'https://backendopra.onrender.com';

  return (
    <ApiContext.Provider value={endpoint}>
      {children}
    </ApiContext.Provider>
  );
};