import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './components/Navbar/index.js';

function App() {
  useEffect(() => {
    // signup
    /* axios
      .post('http://localhost:3001/signup', {
        email: 'example@gmail.com',
        name: 'rahim',
        password: '123',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('Error: ', error.response);
      }); */
    // signin
    /* axios
      .post('http://localhost:3001/signin', {
        email: 'example@gmail.com',
        password: '123',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('Error: ', error.response);
      }); */
    // ========== //
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Hello</h1>
    </div>
  );
}

export default App;
