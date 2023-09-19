import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"




function Main(props) {

  const [news, setNews] = useState([])
  const [selectednews, setSelectednews] = useState([])
  const [isselectednews, setIsselectednews] = useState([])


  
  const fetchNewsData = (q) => {


    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json',"authorization": Cookies.get("token") },
      body: JSON.stringify({q})
  };

    fetch("http://localhost:3001/getnews",requestOptions)
      .then(response => {
        //console.log( response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        setNews(data)
      })
  }

  const logout =()=>{
    props.updateIstoken(0)
    Cookies.remove('token')

  }



  return (
    <div>
    <form onSubmit={(e)=>{e.preventDefault();fetchNewsData(e.target[0].value)}}>
      <p>Keywords</p>
      <div><input></input></div>
      <div><button type="submit">Search</button></div>
    </form>
      <button onClick={(e)=>logout()}>Logout</button>


   {news.map((element,index) => {
    return (
      <div>
       <p onClick={(e)=>{e.preventDefault();setSelectednews(index);setIsselectednews("true")}} key={index}>
        {element.title}
       </p>
       <a href={element.url} target="_blank">Go to News</a>.
       
    </div>
    )
    
   })}
    {isselectednews==="true" && <p>{news[selectednews].content}</p>

}
     
    </div>
  );
}

export default Main;
