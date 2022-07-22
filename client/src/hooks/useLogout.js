import { UserContext } from '../context/userContext.js';
import { useContext } from 'react';

export default function useLogout() {
  const { setAuth } = useContext(UserContext);
  return () => {
    localStorage.clear();
    setAuth({});
  };
}
