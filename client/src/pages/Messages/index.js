import SignUpModal from '../../components/SignUpModal.js';
import LogInModal from '../../components/LogInModal.js';
import MembershipModal from '../../components/MembershipModal.js';
import { useContext, useState, useEffect } from 'react';
import { ModalContext } from '../../context/ModalContext.js';
import { UserContext } from '../../context/UserContext.js';
import axios from '../../lib/axios.js';
import Spinner from './../../components/elements/Spinner.js';
import Message from './Message.js';
import Pagination from '../../components/Pagination.js';
import Header from './Header.js';

export default function Messages() {
  const {
    signupModal,
    setSignupModal,
    loginModal,
    setLoginModal,
    membershipModal,
    setMembershipModal,
  } = useContext(ModalContext);

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
      <Header />

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
      <MembershipModal open={membershipModal} close={setMembershipModal} />
    </>
  );
}
