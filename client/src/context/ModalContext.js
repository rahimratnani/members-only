import { createContext, useState } from 'react';

export const ModalContext = createContext(null);

export default function ModalContextProvider({ children }) {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [membershipModal, setMembershipModal] = useState(false);
  const [newMessageModal, setNewMessageModal] = useState(false);

  const value = {
    signupModal,
    setSignupModal,
    loginModal,
    setLoginModal,
    membershipModal,
    setMembershipModal,
    newMessageModal,
    setNewMessageModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
