import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [auth, setAuth] = useState({ isAuth: false });

  const value = {
    auth,
    setAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
