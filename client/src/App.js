import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './components/Navbar/index.js';
import Messages from './pages/Messages/index.js';

function App() {
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

  temp();
  return (
    <div>
      <Navbar />
      <Messages />
    </div>
  );
}

export default App;
