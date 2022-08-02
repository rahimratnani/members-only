import Modal from '../Modal.js';
import { useState, useContext } from 'react';
import axios from '../../lib/axios.js';
import { UserContext } from '../../context/UserContext.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from '../elements/Spinner.js';
import LogInForm from './LogInForm.js';

const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email.')
    .required('No email provided.'),
  password: yup.string().required('No password provided.'),
});

export default function LogInModal({ open, close }) {
  const [loading, setLoading] = useState(false);
  // true | false | null
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [loginError, setLoginError] = useState('');

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
    setLoginError('');

    setTimeout(() => {
      reset();
      setLoginSuccess(null);
    }, 500);
  };

  const onSubmit = async (data) => {
    const modifiedData = {
      email: data.email.toLowerCase(),
      password: data.password,
    };

    setLoading(true);

    try {
      const res = await axios.post('/signin', modifiedData);

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
      if (error.response.status === 500) {
        setLoginError('Something went wrong.');
      } else {
        setLoginError('Incorrect email or password.');
      }

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
          <LogInForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            handleOnClose={handleOnClose}
            loginSuccess={loginSuccess}
            setLoginSuccess={setLoginSuccess}
            loginError={loginError}
          />
        )}
      </div>
    </Modal>
  );
}
