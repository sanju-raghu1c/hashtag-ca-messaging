import Header from './views/header/Header';
import Login from './views/login/Login';
import MessagesListingHome from './views/messages/MessagesListingHome'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {


  const isLoggedIn = () => {

     return sessionStorage.getItem("loginUserId") ? true : false;
  };


  return (
    <Router>
  <NotificationContainer />
      {isLoggedIn() ? (<Header />) : (<></>)}


      <Switch>


        <Route
          exact
          path='/home'
          render={() => {

            return !isLoggedIn() ? <Redirect to="/" /> : <MessagesListingHome />;
          }}
        />


        <Route path="/">
          <Login />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
