import { useEffect } from 'react';
import logo from '~/assets/logo.svg';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import './Hello.css';

const Hello = () => {
  const { data, isSuccess } = useGetCalendarsQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Hello;
