import { createContext, useState } from 'react';

export const ModalContext = createContext(null);

export default function ModalContextProvider({ children }) {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setloginModal] = useState(false);

  const value = {
    signupModal,
    setSignupModal,
    loginModal,
    setloginModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
