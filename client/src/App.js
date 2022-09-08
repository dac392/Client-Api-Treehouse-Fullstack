import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// import AllUsers from './components/AllUsers';
import Header from './components/Header';
import Courses from './components/Courses';
import LogIn from './components/LogIn';
import PrivateRoute from './PrivateRoute';
import CreateCourses from './components/CreateCourses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';
import Delete from './components/Delete';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import Error from './components/Error';
import NotFound from './components/NotFound';
import Forbiden from './components/Forbiden';

/**
 * Main container for application
 * @returns React application
 */
const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={ <Courses isUpdate={false} details={null} /> }/>
        <Route path="/courses/" element={ <PrivateRoute /> }>
          <Route path="create" element={ <CreateCourses /> } />
          <Route path=":id/update" element={ <UpdateCourse /> }/>
          <Route path=":id/delete" element={ <Delete /> } />
        </Route>
        <Route path="/courses/:id" element={ <CourseDetails /> } />
        <Route path="/login" element={ <LogIn /> } />
        <Route path="/signup" element={ <SignUp /> } />
        <Route path='/logout' element={ <LogOut /> } />
        <Route path='/forbiden' element={ <Forbiden /> } />
        <Route path='/error' element={ <Error /> } />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
