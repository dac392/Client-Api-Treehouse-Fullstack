import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AllUsers from './components/AllUsers';
import Header from './components/Header';
import Courses from './components/Courses';
import LogIn from './components/LogIn';
import { Context } from './Context';

const App = () => {

  // const { isLoading , actions } = useContext(Context);
  // useEffect( ()=>{
  //   actions.getAllUsers()
  //     .then(response => actions.setAllUsers(response))
  //     .catch(error => console.log(error.messgage))
  //     .finally( ()=>actions.setIsLoading(false))
  // }, []);

  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={ <Courses /> }/>
        <Route path="/login" element={ <LogIn /> } />
      </Routes>

      {/* {
        isLoading
        ? <p>Loading...</p>
        : <AllUsers />
      } */}
    </div>
  );
}

export default App;
