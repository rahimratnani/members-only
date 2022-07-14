import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext.js';
import { UserContext } from '../../context/userContext.js';

export default function Navbar() {
  const { setSignupModal, setLoginModal } = useContext(ModalContext);
  const {
    auth: { isAuth },
  } = useContext(UserContext);
  return (
    <nav className="bg-gray-200 flex justify-between h-10 items-center px-4">
      <h1 className="text-2xl font-bold">Members Only</h1>

      <ul className="flex gap-4">
        <li>
          <a href="##">Messages</a>
        </li>
        {isAuth ? null : (
          <>
            <li>
              <button type="button" onClick={() => setLoginModal(true)}>
                Log In
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setSignupModal(true)}>
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
