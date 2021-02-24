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
const REACT_APP_SERVER_URL = 'http://localhost:8000'
//const REACT_APP_SERVER_URL =process.env.REACT_APP_SERVER_URL;

const PrivateRoute = ({ component: Component, ...rest }) => { // Below route checks to see if a user is logged in. 
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props}  /> : <Redirect to="/login" />
    }}
  />;
}

function App() {
  // set Authentication state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
      console.log(`this is token 😍 ${localStorage.getItem('jwtToken')}`)
      console.log(token)
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };
  const tokenExpiration=()=>{
    var dateNow = new Date();
    dateNow.getTime()
    console.log("Inside the tokenExpiration",dateNow.getTime())
    var decodedToken=jwt_decode(localStorage.getItem('jwtToken'));
    if(decodedToken.exp<dateNow.getTime()/1000){
      handleLogout()
      return false
    }
    return true
    console.log("💕")
    console.log(decodedToken.exp)
  } 

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  // Set states for planets. 
  let [data, setData] = useState([]) // For storing all planet data.
  const [refreshPage, setRefreshPage] = useState(false) // For refreshing the Planet page after adding a comment to it.

  // Retrieves planet data from the Mongo database
  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/planets`).then(res => {
      setData([...res.data.planets])
    })
  }, [])  
  
  // Add a comment to a planet.
  // To store the temporary comment content, the onChange for setNewComment is in AddComment.js
  // The onClick happens in AddComment.js.
  // The props get passed into AddComment.js from App.js. 
  const addComment = (content, planetId) => {
    let comment = {
      planet: planetId,
      user: currentUser.id,
      content: content,
      archived: false
    }
    // Below is the same thing as axios.post()
    axios({
        url: `${REACT_APP_SERVER_URL}/comments/add/${planetId}`,
        method: 'POST',
        headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        data:{
          'comment': JSON.stringify(comment), // Convert to JSON object so we can pass it via axios.
          'userData': JSON.stringify(currentUser) // W don't need this but including it to show how to send more than 1 object.
        }
    }).then( res => {
      console.log(res.data)
      refreshPage ? setRefreshPage(false) : setRefreshPage(true) // Toggle between the two every time a comment is added.
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
      <div >
        <Switch>

          {/* Route to display all planets */}
          <Route exact path="/planets" render={ (props) => {
              return < AllPlanets planetData={data} />
            }}
          />

          {/* Route to display specific planet by ID */}
          <Route path="/planets/display/:id" render={ (props) => {
              return < Planet tokenExpiration={tokenExpiration} planetId={props.match.params.id} refreshPage={refreshPage} user={currentUser} />
            }}
          />

          {/* Route to add comment to specific Planet by ID */}
          <Route path="/comments/add/:id" render={ (props) => {
              return < AddComment planetId={props.match.params.id} addComment={addComment} tokenExpiration={tokenExpiration} user={currentUser}/>
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