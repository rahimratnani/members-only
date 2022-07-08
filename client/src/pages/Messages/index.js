import SignUpModal from '../../components/SignUpModal/index.js';
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext.js';

export default function Messages() {
  const { signupModal, setSignupModal } = useContext(ModalContext);

  return (
    <>
      <h1 className="font-bold text-2xl">Messages</h1>

      <SignUpModal open={signupModal} close={setSignupModal} />
    </>
  );
}
