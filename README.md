# Client & API Fullstack Application

> Project 13 of Teamtreehouse web development techdegree program

### Layout

1. **client:** Front end
   - Set up with _**Express**_
   - Built with _**React**_
   - Uses _**React-Router v6**_
   - Applies _**Context**_ for readability
   - Maintains log in status using _**Cookies**_
   - Uses _**Hooks**_ to maintain state and context
1. **api:** Back end

   - Set up with _**Express**_
   - Uses a _**Sequelize**_ db to maintain user data
   - Uses _**Basic Authentication**_
   - _**Encrypts**_ user password

   ## Database & API

Sets up a server on localhost:5000 to maitain user data.

As it stands, the database is set up to store:

```javascript
{
  name: required;
  username: required;
  password: required;
}
```

The API routes:

- GET _localhost:5000/api/users_ using username and password fields for Basic Authentication
- POST _localhose:5000/api/users_ which accepts a JSON object containing the new user information

## Client

The client itself is not meant to be impresive as much as it is focused on functionality and usablity. Maintains context for the application within client/src/Context.js to prevent propdrilling and aid readability. Additionally utilizes react and react-router-dom hook to access and maintain state, actions, and context.

The app's available routes accessed using **_localhost:3000_** :-

- **/** : welcome page
- **/signup** : sign up form
  - POST new user to the db
  - redirects to /authenticated once successfully signed up
  - sets a cookie with the authenticated user's information which expires in 1 day
- **/login** : log in form
  - utilizes Basic Authentication for loging in
  - redirects to /authenticated when successfully logged in
  - sets a cookie with the authenticated user's information which expires in 1 day
- **/logout** : loggs out the current user
  - redirects to localhost:3000/
  - deletes the user's cookie
- **/authenticated** : PrivateRoute and default message when successfully logged in
  - redirects to /login if un-authenticated user tries to access route.
- **/profile** : additional PrivateRoute displaying the user's information

  - redirects to /login if un-authenticated user attempts to access route. Once successfully logged in, the user will be redirected back to /profile as it was the originally intended route to visit
