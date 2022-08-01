import Modal from './Modal.js';
import { Dialog } from '@headlessui/react';
import { useState, useContext, useRef } from 'react';
import axios from '../lib/axios.js';
import { UserContext } from '../context/UserContext.js';
import XIcon from '../assets/icons/XIcon.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from './elements/Spinner.js';

const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email.')
    .required('No email provided.'),
  password: yup.string().required('No password provided.'),
});

export default function LogInModal({ open, close }) {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const { setAuth } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(LogInSchema) });

  const handleOnClose = () => {
    close(false);

    setLoading(false);
    setLoginSuccess(null);

    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post('/signin', data);

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
    } catch (error) {
      console.error(error.response);
      setLoginSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="bg-white py-9 px-4 sm:px-10 w-80 sm:w-[28rem] rounded-md relative">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spinner />
          </div>
        ) : (
          <>
            <div>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 text-left"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      autoComplete="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    {errors.email && (
                      <p className="text-red-500 text-xs  text-left mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 text-left"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('password')}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    {errors.password && (
                      <p className="text-red-500 text-xs  text-left mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-center items-center absolute right-4 top-4">
              <button
                onClick={handleOnClose}
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset rounded-md"
              >
                <XIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

/* 

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
*/
