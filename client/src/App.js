import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios
      .post('http://localhost:3001/signup', {
        email: 'hello',
        name: 'rahim',
        password: '123',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log('Error: ', error.response);
      });
  }, []);
  return <h1>hello</h1>;
}

export default App;
