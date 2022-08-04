import SignUpModal from '../../components/SignUpModal/index.js';
import LogInModal from '../../components/LogInModal/index.js';
import MembershipModal from '../../components/MembershipModal/index.js';
import NewMessageModal from '../../components/NewMessageModal/index.js';
import { useContext, useState, useEffect, useCallback } from 'react';
import { ModalContext } from '../../context/ModalContext.js';
import { UserContext } from '../../context/UserContext.js';
import axios from '../../lib/axios.js';
import Spinner from './../../components/elements/Spinner.js';
import Message from './Message.js';
import Pagination from './Pagination.js';
import Header from './Header.js';

export default function Messages() {
  const {
    signupModal,
    setSignupModal,
    loginModal,
    setLoginModal,
    membershipModal,
    setMembershipModal,
    newMessageModal,
    setNewMessageModal,
  } = useContext(ModalContext);

  const { auth } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteMsgId, setDeleteMsgId] = useState('');

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const getMessages = useCallback(async (page) => {
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
  }, []);

  const handleDeleteMessage = async (id) => {
    if (!id || !auth.is_admin) return;

    const token = localStorage.getItem('token');

    setDeleteMsgId(id);

    try {
      await axios.delete(`/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getMessages(page).finally(() => {
        setLoading(false);
        setDeleteMsgId('');
      });
    } catch (error) {
      setDeleteMsgId('');
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages(page).finally(() => setLoading(false));
  }, [page, getMessages]);

  const messagesComponents = messages.map((message) => (
    <Message
      key={message._id}
      message={message}
      auth={auth}
      handleDeleteMessage={handleDeleteMessage}
      deleteMsgId={deleteMsgId}
    />
  ));

  return (
    <div className="relative min-h-screen pb-[90px] sm:pb-[110px]">
      <Header />

      {loading ? (
        <div className="flex justify-center items-center absolute inset-0 m-auto">
          <Spinner />
        </div>
      ) : (
        <main className="bg-white w-full">
          <div className="max-w-7xl space-y-8 mt-12 mx-auto px-4 sm:px-6 lg:px-8">
            {/* <Message message={messages[0]} auth={auth} /> */}
            {/* <Message message={messages[1]} auth={auth} /> */}
            {messagesComponents}
          </div>
        </main>
      )}

      <Pagination
        totalPages={totalPages}
        page={page}
        handlePageClick={handlePageClick}
      />

      <SignUpModal open={signupModal} close={setSignupModal} />
      <LogInModal open={loginModal} close={setLoginModal} />
      <MembershipModal open={membershipModal} close={setMembershipModal} />
      <NewMessageModal
        open={newMessageModal}
        close={setNewMessageModal}
        getMessages={getMessages}
        stopMessagesSpinner={() => setLoading(false)}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
