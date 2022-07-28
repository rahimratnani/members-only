import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    name: '',
    email: '',
    is_member: false,
    is_admin: false,
    id: '',
  });

  const value = {
    auth,
    setAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
