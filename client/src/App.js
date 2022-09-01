import React, { useContext } from 'react';
import './App.css';
import { Context } from './Context';

const App = () => {
 const { actions } = useContext(Context);
 const users = actions.getAllUsers();
  
  return (
    <div>
      <h1>List of all Users</h1>
      <ul>
        {
          users.map(user=> (<li />))
        }
      </ul>
    </div>
  );
}

export default App;
