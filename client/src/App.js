import { useEffect, useContext, useState } from 'react';
import Navbar from './components/Navbar/index.js';
import Messages from './pages/Messages/index.js';
import Spinner from './components/elements/Spinner.js';
import axios from './lib/axios.js';
import { UserContext } from './context/userContext.js';

function App() {
  const [loading, setLoading] = useState(true);

  const { setAuth } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async (token) => {
      try {
        const { data } = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // set auth context to true
        setAuth((prev) => ({
          ...prev,
          isAuth: true,
          name: data?.user.name,
          email: data?.user.email,
          is_admin: data?.user.is_admin,
          is_member: data?.user.is_member,
          id: data?.user._id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const token = localStorage.getItem('token');

    if (token) {
      getUserInfo(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function temp() {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  // temp();
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Navbar />
      <Messages />
    </div>
  );
}

export default App;
