import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext.js';
import { UserContext } from '../../context/userContext.js';
import useLogout from '../../hooks/useLogout.js';

export default function Navbar() {
  const { setSignupModal, setLoginModal, setMembershipModal } =
    useContext(ModalContext);
  const {
    auth: { isAuth, is_member, name },
  } = useContext(UserContext);

  const logout = useLogout();

  return (
    <nav className="bg-gray-200 flex justify-between h-10 items-center px-4">
      <h1 className="text-2xl font-bold">Members Only</h1>

      <ul className="flex gap-4">
        {isAuth ? (
          <>
            {is_member ? (
              <li>
                <a href="##">New Message</a>
              </li>
            ) : null}

            {!is_member ? (
              <li>
                <button onClick={() => setMembershipModal(true)}>
                  Join Club
                </button>
              </li>
            ) : null}

            <li>
              <p>Name: {name}</p>
            </li>

            <li>
              <p>{is_member ? 'Member' : 'Not Member'}</p>
            </li>
            <li>
              <button type="button" onClick={() => logout()}>
                Log Out
              </button>
            </li>
          </>
        ) : (
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
