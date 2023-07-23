import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [copyValue, setCopyValue] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        generatedId,
        setGeneratedId,
        copyValue,
        setCopyValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
