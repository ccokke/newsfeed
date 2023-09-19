import express from "express";
import env from "dotenv";
import axios from "axios";
import cors from "cors"
import bodyParser from "body-parser"
import { db } from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.listen(3001,()=>{
    console.log("Port listening")
})



app.post("/getnews",async (req,res)=>{
   if(authaenticateToken(req.headers["authorization"]))
   {
    var data =await getnews(req.body.q)

    res.send(data)
   }
   else
   res.sendStatus(401);

})

app.post("/login",async (req,res)=>{
  const username = req.body.user.username;
  const pwd = req.body.user.pwd;
  
  
  const user = await login(username)
  if(user)
  {
    //console.log(user)
    const isCorrectPwd =  bcrypt.compare(pwd, user.passwordHash);
    if(isCorrectPwd)
    {
      
      const accesstoken =  jwt.sign({username :req.body.user.username , passwordHash : user.passwordHash},process.env.ACCESS_TOKEN_SECRET);
      res.send({accesstoken});
    }

  }
  else
  res.sendStatus(401);
  

  
})

app.post("/signup",async (req,res)=>{
  console.log(req.body.user.username);
  console.log(req.body.user.pwd);
  const passwordHash = await bcrypt.hash(req.body.user.pwd, 10);
  const user = await signup({username :req.body.user.username , passwordHash : passwordHash});
  res.send(user);
})

var getnews =async (q)=> {

    var data;
    await axios.get("https://newsapi.org/v2/everything?q="+q+"&apiKey="+process.env.NEWSAPIKEY)
  .then(function (response) {
    // handle success
   //console.log(response.data.articles[0])
    data = response.data.articles;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
return data;
}




var signup =async (user) =>{
   return await db.user.create( {data : user});
}

var login =async (username) =>{
//db pasword kontrolü başarılı ise user dön
  return await db.user.findUnique( {where : {username}});
}

var authaenticateToken = (token)=>{
  var isValid = 0;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err)=>{
    if(err) {
      console.log(err)
    }
    
    isValid = 1;
  
  })
  if(isValid)
  return 1
  else
  return 0
}
