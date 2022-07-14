import Modal from '../Modal/index.js';
import { Dialog } from '@headlessui/react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext.js';

export default function SignUpModal({ open, close }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const { setAuth } = useContext(UserContext);

  const resetState = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmedPassword('');
    setLoading(false);
    setSignupSuccess(null);
  };

  const handleOnClose = () => {
    close(false);

    setTimeout(() => {
      resetState();
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !confirmedPassword) {
      return;
    }

    if (password !== confirmedPassword) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        {
          email,
          name: userName,
          password,
        }
      );

      console.log(res);

      const {
        token,
        _id,
        name,
        email: userEmail,
        is_admin,
        is_member,
      } = res.data;

      localStorage.setItem('token', token);

      setAuth((prev) => ({
        ...prev,
        isAuth: true,
        name,
        email: userEmail,
        is_member,
        is_admin,
        id: _id,
      }));

      setSignupSuccess(true);

      setLoading(false);
    } catch (error) {
      // show error
      console.error('Something went wrong', error.response);
      setSignupSuccess(false);
      setLoading(false);
    }
  };

  // console.log(process.env.REACT_APP_SERVER_URL);

  /* useEffect(() => {
    console.log('Mounted');

    return () => console.log('Unmounted');
  }, []); */

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="w-96 bg-white py-3 px-4">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          {signupSuccess === null
            ? 'Sign Up'
            : signupSuccess === true
            ? 'Success'
            : 'Failure'}
        </Dialog.Title>

        {loading && <p>Loading...</p>}

        {signupSuccess === null ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={userName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  value={confirmedPassword}
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Modal>
  );
}
