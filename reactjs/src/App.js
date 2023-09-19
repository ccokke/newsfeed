import './App.css';
import Main from "./Components/Main";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { useEffect , useState } from 'react';
import Cookies from "js-cookie"



function App() {

  const [istoken, setIstoken] = useState([])
  const [formtype, setFormtype] = useState("Login")
  useEffect(() => {

   const token = Cookies.get("token")
    if(token)
     setIstoken(1);
    else
    setIstoken(0);
  }, [])

  var updateIstoken = (istoken) =>{
    setIstoken(istoken)
  }
  var updateFormtype = (formtype) =>{
    setFormtype(formtype)
  }
  return (
    <div className="App">
    {istoken===1&&( <Main updateIstoken={updateIstoken}/>)}
    {istoken===0&&
    <div>
        {formtype==="Login" &&(<Login updateIstoken={updateIstoken} updateFormtype={updateFormtype}/>)}
       {formtype==="Register" &&(<Register updateFormtype={updateFormtype}/>)}

    </div>
     
    }
 

    </div>

  )
}

export default App;
