import React, { useContext, useEffect } from 'react';

import AllUsers from './components/AllUsers';
import Header from './components/Header';
import { Context } from './Context';

const App = () => {

  const { isLoading , actions } = useContext(Context);
  
  useEffect( ()=>{
    actions.getAllUsers()
      .then(response => actions.setAllUsers(response))
      .catch(error => console.log(error.messgage))
      .finally( ()=>actions.setIsLoading(false))
  }, []);

  return (
    <div>
      <Header />
      <h1>List of all Users</h1>
      {
        isLoading
        ? <p>Loading...</p>
        : <AllUsers />
      }
    </div>
  );
}

export default App;
