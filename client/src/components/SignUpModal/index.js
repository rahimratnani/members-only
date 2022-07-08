import Modal from '../Modal/index.js';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpModal({ open, close }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnClose = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmedPassword('');

    close(false);
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

      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);

      setLoading(false);
    } catch (error) {
      // show error
      console.error('Something went wrong', error.response);
      setLoading(false);
    }
  };

  // console.log(process.env.REACT_APP_SERVER_URL);

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="w-96 bg-white py-3 px-4">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          Sign Up
        </Dialog.Title>

        {loading && <p>Loading...</p>}

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
      </div>
    </Modal>
  );
}
