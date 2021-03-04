import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import About from './components/About';
import NotFound from './components/NotFound'

// User
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import Profile from './components/User/Profile';
import ProfileEdit from './components/User/ProfileEdit';
import ProfileComments from './components/User/ProfileComments';

// Planets
import AllPlanets from './components/Planet/AllPlanets'
import Planet from './components/Planet/Planet'

// Comments
import AddComment from './components/Comment/AddComment.js'

// APOD
import APOD from './components/APOD/APOD.js'

// Misc
import './App.css';
const axios = require('axios')
const SERVER_URL=process.env.REACT_APP_SERVER_URL

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
  let [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
      console.log(`💫 The user token is: ${localStorage.getItem('jwtToken')}`)
    }
  }, [updateUser]);

  const nowCurrentUser = (userData) => {
    console.log('💫 nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };
  const tokenExpiration=()=>{
    var dateNow = new Date();
    dateNow.getTime()
    console.log(" 💫Inside the tokenExpiration",dateNow.getTime())
    var decodedToken=jwt_decode(localStorage.getItem('jwtToken'));
    if(decodedToken.exp<dateNow.getTime()/1000){
      handleLogout()
      return false
    }
    return true
    // console.log("💕")
    // console.log(decodedToken.exp)
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
    axios.get(`${SERVER_URL}/planets`).then(res => {
      // console.log("The planets we're receiving from the API: ", res)
      setData([...res.data.planets])
    })
  }, [])  
  
  // Add a comment to a planet.
  // To store the temporary comment content, the onChange for setNewComment is in /omment.js
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
        url: `${SERVER_URL}/comments/add/${planetId}`,
        method: 'POST',
        headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        data:{
          'comment': JSON.stringify(comment), // Convert to JSON object so we can pass it via axios.
          'userData': JSON.stringify(currentUser) // W don't need this but including it to show how to send more than 1 object.
        }
    }).then( res => {
      // console.log(res.data)
      refreshPage ? setRefreshPage(false) : setRefreshPage(true) // Toggle between the two every time a comment is added.
    })
    .catch(err=>{
      console.log(`🤞 Error adding a comment: ${err}`)
    })
  }

  // console.log('Current User', currentUser);
  // console.log('Authenticated', isAuthenticated);

  return (
    <div >
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div >
        <Switch>
          <Route exact path="/" component={ Welcome } />

          <Route path="/about" component={ About } />

          <Route path="/apod" render={(props) => { return < APOD user={currentUser} /> }}/>

          {/* Display all planets */}
          <Route exact path="/planets" render={ (props) => {
              return < AllPlanets planetData={data} />
            }}
          />

          {/* Display specific planet by mongoose ID */}
          <Route path="/planets/display/:id" render={ (props) => {
              return < Planet tokenExpiration={tokenExpiration} planetId={props.match.params.id} refreshPage={refreshPage} user={currentUser} />
            }}
          />

          {/* Add comment to specific Planet ID */}
          <PrivateRoute path="/comments/add/:id" render={ (props) => {
              return < AddComment planetId={props.match.params.id} addComment={addComment} tokenExpiration={tokenExpiration} user={currentUser}/>
            }}
          />

          {/* Authentication Routes */}
          <Route path="/signup" component={ Signup } nowCurrentUser={nowCurrentUser} setUpdateUser={setUpdateUser} />
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          <PrivateRoute exact path="/profile" component={ Profile } user={currentUser} planets={data} />
          <PrivateRoute path="/profile/edit" component={ ProfileEdit } user={currentUser} updateUser={updateUser} setUpdateUser={setUpdateUser} nowCurrentUser={nowCurrentUser} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
          <PrivateRoute path="/profile/comments" component={ ProfileComments } user={currentUser} planets={data} />

          <Route component={NotFound} /> 
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;