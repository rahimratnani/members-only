import SignUpModal from '../../components/SignUpModal/index.js';
import { useContext, useState } from 'react';
import { ModalContext } from '../../context/modalContext.js';

export default function Messages() {
  const { signupModal, setSignupModal } = useContext(ModalContext);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  return (
    <>
      <h1 className="font-bold text-2xl">Messages</h1>

      <SignUpModal open={signupModal} close={setSignupModal} />
    </>
  );
}
