import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import Profile from './components/User/Profile';
import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';
import AllPlanets from './components/Planet/AllPlanets'
import Planet from './components/Planet/Planet'
import CommentPage from './components/Comment/AddComment.js'
import TestData from './Data'
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => { // Below route checks to see if a user is logged in. 
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}

// This is just dummy data to use while the backend is being made. Will remove in the future
const planetData = [{ name: 'Earth', id: 0 }, { name: 'Pluto', id: 1 }, { name: 'Mars', id: 2 } ]
const commentArray = [{ text: 'Wow!'}, { text: 'Radical'}, { text: 'Third thing!'}]

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  // Remove once backend is made
  let [data, setData] = useState(TestData)

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  const addComment = (input, id) => {
    let tempData = data
    let tempObject = {
      text: input
    }
    tempData[id].comments.push(tempObject)
    setData([...tempData])
  }

  console.log('Current User', currentUser);
  console.log('Authenicated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>

          {/* Route to display all planets */}
          <Route exact path="/planets" render={ (props) => {
              return < AllPlanets planetData={data} />
            }}
          />

          {/* Route to display specific planet by ID */}
          <Route path="/planets/display/:id" render={ (props) => {
              return < Planet planet={data[props.match.params.id]} />
            }}
          />

          {/* Route to add comment to specific Planet by ID */}
          <Route path="/comments/add/:id" render={ (props) => {
              return < CommentPage planet={data[props.match.params.id]} addComment={addComment} />
            }}
          />

          {/* Sign Up Route */}
          <Route path="/signup" component={ Signup } />

          {/* Login Route */}
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          <Route path="/about" component={ About } />
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} />
          <Route exact path="/" component={ Welcome } />

        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
