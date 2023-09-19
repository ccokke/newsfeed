import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"


function Login(props) {
  const [user, setUser] = useState([])
 
  function login(e) {
  
    const user = {
      "username" : e.target[0].value,
      "pwd" :  e.target[1].value
    }

    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user})
  };

    fetch("http://localhost:3001/login",requestOptions)
      .then(response => {
        //console.log( response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        Cookies.set('token', data.accesstoken)
        props.updateIstoken(1)
      })

}
function setFormtype(){
    props.updateFormtype("Register")
}
  return (
    <div>
      
      <form onSubmit={(e)=>{e.preventDefault();login(e)}}>
        <p>Login Form</p>
      <p>Username</p>
        <input name="username"></input>
      <p>Password</p>
      <input name="passwd" type="password"></input>
      <br/>
      <button type="submit">Login</button>
      </form>
      Don't have account<p onClick={(e)=>{setFormtype()}}>Register</p>
    </div>
  )
}

export default Login;
