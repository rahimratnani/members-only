import Modal from '../Modal.js';
import { useState, useContext } from 'react';
import axios from '../../lib/axios.js';
import { UserContext } from '../../context/UserContext.js';
import Spinner from '../elements/Spinner.js';
import SignUpForm from './SignUpForm.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'No name provided.')
    .max(50, 'Name cannot be greater than 50 letters.')
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      'Name can only contain letters and spaces.'
    )
    .required('No name provided.'),
  email: yup
    .string()
    .email('Enter a valid email.')
    .required('No email provided.'),
  password: yup
    .string()
    .required('No password provided.')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
    .max(50, 'Cannot be greater than 50 characters.'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

export default function SignUpModal({ open, close }) {
  const [loading, setLoading] = useState(false);
  // true | false | null
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [signupError, setSignupError] = useState('');

  const { setAuth } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(SignUpSchema) });

  const handleOnClose = () => {
    close(false);
    setLoading(false);
    setSignupError('');

    setTimeout(() => {
      reset();
      setSignupSuccess(null);
    }, 500);
  };

  const onSubmit = async (data) => {
    const modifiedData = {
      name: data.name.toLowerCase(),
      email: data.email.toLowerCase(),
      password: data.password,
    };

    setLoading(true);

    try {
      const res = await axios.post('/signup', modifiedData);

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
    } catch (error) {
      if (error.response.status === 409) {
        setSignupError('User already exists. Please login.');
      } else {
        setSignupError('Something went wrong.');
      }

      setSignupSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !confirmedPassword) {
      return;
    }

    if (password !== confirmedPassword) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('/signup', {
        email,
        name: userName,
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

      setSignupSuccess(true);

      setLoading(false);
    } catch (error) {
      // show error
      console.error('Something went wrong', error.response);
      setSignupSuccess(false);
      setLoading(false);
    }
  }; */

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="bg-white py-9 px-4 sm:px-10 w-80 sm:w-[28rem] rounded-md relative">
        {loading ? (
          <div className="flex justify-center items-center h-[250px]">
            <Spinner />
          </div>
        ) : (
          <SignUpForm
            signupSuccess={signupSuccess}
            handleOnClose={handleOnClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            setSignupSuccess={setSignupSuccess}
            signupError={signupError}
          />
        )}
      </div>
    </Modal>
  );
}
