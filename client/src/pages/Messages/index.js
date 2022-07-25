import SignUpModal from '../../components/SignUpModal/index.js';
import LogInModal from '../../components/LogInModal/index.js';
import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../../context/modalContext.js';
import { UserContext } from '../../context/userContext.js';
import axios from '../../lib/axios.js';
import Spinner from './../../components/elements/Spinner.js';
import Message from '../../components/Message/index.js';
import Pagination from '../../components/Pagination/index.js';

export default function Messages() {
  const { signupModal, setSignupModal, loginModal, setLoginModal } =
    useContext(ModalContext);

  const { auth } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get('/api/messages', {
          params: {
            page,
            limit: 10,
          },
        });

        setMessages(data?.messages);
        setTotalPages(data?.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    getMessages().finally(() => setLoading(false));
  }, [page]);

  const messagesComponents = messages.map((message) => (
    <Message key={message._id} message={message} auth={auth} />
  ));

  return (
    <>
      <h1 className="font-bold text-2xl text-center">Messages</h1>

      {loading ? (
        <Spinner />
      ) : (
        <main className="mt-7 w-3/4 mx-auto">{messagesComponents}</main>
      )}

      <Pagination
        totalPages={totalPages}
        page={page}
        handlePageClick={handlePageClick}
      />

      <SignUpModal open={signupModal} close={setSignupModal} />
      <LogInModal open={loginModal} close={setLoginModal} />
    </>
  );
}
