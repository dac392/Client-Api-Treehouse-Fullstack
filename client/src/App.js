import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AllUsers from './components/AllUsers';
import Header from './components/Header';
import Courses from './components/Courses';
import LogIn from './components/LogIn';
import PrivateRoute from './PrivateRoute';
import CreateCourses from './components/CreateCourses';

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
        <Route path="/courses/" element={ <PrivateRoute /> }>
          <Route path="create" element={ <CreateCourses /> } />
          <Route path=":id/update" element={ <h1>Update</h1> }/>
          <Route path=":id" element={ <h1>Something</h1> } />
        </Route>
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
