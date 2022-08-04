import Modal from '../Modal.js';
import Spinner from '../elements/Spinner.js';
import { useState } from 'react';
import NewMessageForm from './NewMessageForm.js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../lib/axios.js';

const MessageSchema = yup.object().shape({
  title: yup.string().required('No title provided.'),
  message: yup.string().required('No message provided.'),
});

export default function NewMessageModal({
  open,
  close,
  getMessages,
  stopMessagesSpinner,
  setPage,
  page,
}) {
  const [loading, setLoading] = useState(false);
  // true | false | null
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(MessageSchema) });

  const handleOnClose = () => {
    close(false);
    setLoading(false);

    setTimeout(() => {
      reset();
      setMessageSuccess(null);
      setMessageError('');
    }, 500);
  };

  const onSubmit = async (data) => {
    const modifiedData = {
      title: data.title.toLowerCase(),
      message: data.message.toLowerCase(),
    };

    const token = localStorage.getItem('token');

    setLoading(true);

    try {
      const res = await axios.post('/api/messages', modifiedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201 && page === 1) {
        getMessages(1).finally(() => stopMessagesSpinner());
      } else if (res.status === 201) {
        setPage(1);
      } else {
        return;
      }

      setMessageSuccess(true);
    } catch (error) {
      setMessageError('Something went wrong.');
      setMessageSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <div className="bg-white py-9 px-4 sm:px-10 w-80 sm:w-[28rem] rounded-md relative">
        {loading ? (
          <div className="flex justify-center items-center h-[280px]">
            <Spinner />
          </div>
        ) : (
          <NewMessageForm
            handleOnClose={handleOnClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            messageSuccess={messageSuccess}
            setMessageSuccess={setMessageSuccess}
            messageError={messageError}
          />
        )}
      </div>
    </Modal>
  );
}
