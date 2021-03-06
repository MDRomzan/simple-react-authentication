import './App.css';

import initializeAuthentication from './Firebase/firebase.initialize';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut
} from "firebase/auth";
import React,{useState} from "react";

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
const [user,setUser]=useState({})
  const auth = getAuth()
const handleGoogleSignIn=()=>{

  signInWithPopup(auth,googleProvider)
  .then(result =>{
    const {displayName,email,photoURL}=result.user;
    
    const loggedInUser={
      name:displayName,
      email:email,
      photo:photoURL
    };
    setUser(loggedInUser);
  })
  .catch(error =>{
      console.log(error.message);
  })

}
const handleGithubSignIn =()=>{
    signInWithPopup(auth,gitHubProvider)
    .then(result =>{
      const {displayName,photoURL,email}=result.user;
      const loggedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      };
      setUser(loggedInUser);
    })
}
const handleSignOut=()=>{
  signOut(auth)
  .then(()=>{
    setUser({});
  })
}

  return (
    <div className="App">
     
      { 
      !user.name?
      <div>
      <button onClick={handleGoogleSignIn}>Google Sing In</button>
      <button onClick={handleGithubSignIn}>Github signIn</button>
      </div>: 
      
      <button onClick={handleSignOut}>SignOut</button>
      }
      <br />

      {
        user.name && <div>
          <h3>Welcome {user.name}</h3>
          <p>I know your email adderss {user.email}</p>
          <img src={user.photo} alt="" />
          </div> 
      }
    </div>
  );
}

export default App;
