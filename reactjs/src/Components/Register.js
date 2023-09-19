import React, { useEffect, useState } from "react"



function Register(props) {
  const [user, setUser] = useState([])

  function signup(e) {
  
    const user = {
      "username" : e.target[0].value,
      "pwd" :  e.target[1].value
    }

    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user})
  };

    fetch("http://localhost:3001/signup",requestOptions)
      .then(response => {
        //console.log( response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        setUser(data)
      })

}
function setFormtype(){
  props.updateFormtype("Login")
}
  return (
    <div>
      
      <form onSubmit={(e)=>{e.preventDefault();signup(e)}}>
        <p>Register Form</p>
      <p>Username</p>
        <input name="username"></input>
      <p>Password</p>
      <input name="passwd" type="password"></input>
      <br/>
      <button type="submit">Signup</button>
      </form>
      <p onClick={setFormtype}>Giriş Yap</p>
    </div>
  )
}

export default Register;
