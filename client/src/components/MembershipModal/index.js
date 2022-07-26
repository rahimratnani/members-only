import Modal from '../Modal/index.js';
import { Dialog } from '@headlessui/react';
import { useState, useContext } from 'react';
import axios from '../../lib/axios.js';
import { UserContext } from '../../context/userContext.js';

export default function MembershipModal({ open, close }) {
  const { auth, setAuth } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!secret) return;

    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/users/${auth.id}`,
        { secret },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.user.is_member) {
        setAuth((prev) => ({
          ...prev,
          is_member: res.data?.user.is_member,
        }));

        setSuccess(true);
      }

      console.log('membership', res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClose = () => {
    setLoading(false);
    setSecret('');
    setSuccess(false);

    close(false);
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="w-96 bg-white h-44 py-3 px-4">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          Become A Member
        </Dialog.Title>

        {loading && <p>Loading...</p>}

        {success ? (
          <h2 className="text-center font-bold text-lg">
            Welcome To The Club!
          </h2>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="secret"
                className="block text-sm font-medium text-gray-700"
              >
                Enter The Secret
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setSecret(e.target.value)}
                  id="secret"
                  name="secret"
                  type="text"
                  required
                  value={secret}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 disabled:bg-slate-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Join
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
