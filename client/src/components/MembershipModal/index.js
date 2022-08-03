import Modal from '../Modal.js';
import { useState, useContext } from 'react';
import axios from '../../lib/axios.js';
import { UserContext } from '../../context/UserContext.js';
import Spinner from '../elements/Spinner.js';
import MembershipForm from './MembershipForm.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SecretSchema = yup.object().shape({
  secret: yup
    .string()
    .required('No secret provided.')
    .max(50, 'Cannot be greater than 50 letters.'),
});

export default function MembershipModal({ open, close }) {
  const { auth, setAuth } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  // true | false | null
  const [success, setSuccess] = useState(null);
  const [joiningError, setJoiningError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(SecretSchema) });

  const handleOnClose = () => {
    close(false);
    setLoading(false);

    setTimeout(() => {
      reset();
      setSuccess(null);
      setJoiningError(null);
    }, 500);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    setLoading(true);

    try {
      const res = await axios.put(`/api/users/${auth.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.user.is_member) {
        setAuth((prev) => ({
          ...prev,
          is_member: res.data?.user.is_member,
        }));

        setSuccess(true);
      }
    } catch (error) {
      if (error.response.status === 500) {
        setJoiningError('Something went wrong.');
      } else {
        setJoiningError('Invalid Secret.');
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="bg-white py-9 px-4 sm:px-10 w-80 sm:w-[28rem] rounded-md relative">
        {loading ? (
          <div className="flex justify-center items-center h-[150px]">
            <Spinner />
          </div>
        ) : (
          <MembershipForm
            handleOnClose={handleOnClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            success={success}
            setSuccess={setSuccess}
            joiningError={joiningError}
          />
        )}
      </div>
    </Modal>
  );
}
