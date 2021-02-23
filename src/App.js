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
import AddComment from './components/Comment/AddComment.js'
import TestData from './Data'
import './App.css';
const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PrivateRoute = ({ component: Component, ...rest }) => { // Below route checks to see if a user is logged in. 
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  // Remove once backend is made
  let [data, setData] = useState([])

  // Retrieves planet data from the Mongo database
  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/planets`).then(res => {
      setData([...res.data.planets])
    })
  }, [])

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
  
  // Add a comment to a planet.
  // The onClick happens in AddComment.js.
  // The props get passed into AddComment.js from Planet.js. 
  const addComment = (content, planetId) => {
    let comment = {
      planet: planetId,
      user: currentUser.id,
      content: content,
      archived: false
    }
    axios({
        url: `${REACT_APP_SERVER_URL}/comments/add/${planetId}`,
        method: 'POST',
        headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        data:{
          'comment': JSON.stringify(comment), // Convert to JSON object so we can pass it via axios.
          'userData': JSON.stringify(currentUser)
        }
    }).then( res => {
      console.log(res.data)
    })
    .catch(err=>{
      console.log(`🤞 ${err}`)
    })
  }

  // console.log('Current User', currentUser);
  // console.log('Authenticated', isAuthenticated);

  return (
    <div >
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className='app-main'>
        <Switch>

          {/* Route to display all planets */}
          <Route exact path="/planets" render={ (props) => {
              return < AllPlanets planetData={data} />
            }}
          />

          {/* Route to display specific planet by ID */}
          <Route path="/planets/display/:id" render={ (props) => {
              return < Planet planetData={data[props.match.params.id]} planetId={props.match.params.id} user={currentUser} />
            }}
          />

          {/* Route to add comment to specific Planet by ID */}
          <Route path="/comments/add/:id" render={ (props) => {
              return < AddComment planetId={props.match.params.id} planet={data[props.match.params.id]} addComment={addComment} />
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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
