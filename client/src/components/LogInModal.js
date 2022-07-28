import Modal from './Modal.js';
import { Dialog } from '@headlessui/react';
import { useState, useContext } from 'react';
import axios from '../lib/axios.js';
import { UserContext } from '../context/UserContext.js';

export default function LogInModal({ open, close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const { setAuth } = useContext(UserContext);

  const resetState = () => {
    setEmail('');
    setPassword('');
    setLoading(false);
    setLoginSuccess(null);
  };

  const handleOnClose = () => {
    close(false);

    setTimeout(() => {
      resetState();
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('/signin', {
        email,
        password,
      });

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

      setLoginSuccess(true);

      setLoading(false);
    } catch (error) {
      // show error
      console.error('Something went wrong', error.response);
      setLoginSuccess(false);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="w-96 bg-white py-3 px-4">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          {loginSuccess === null
            ? 'Log In'
            : loginSuccess === true
            ? 'Success'
            : 'Failure'}
        </Dialog.Title>

        {loading && <p>Loading...</p>}

        {loginSuccess === null ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Modal>
  );
}
