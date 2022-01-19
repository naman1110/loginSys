const express= require('express');
const app=express();
const fs = require("fs")
const path=require('path')
const bcrypt = require('bcrypt');





const user=[]; 
const u=[];


app.use(express.urlencoded())
app.set('view engine', 'pug');

app.use('/static', express.static('static')) 

app.get('/', function (req, res) {
  res.render('index.pug', { title: 'Hey'});
})


app.post('/',async(req,res)=>{
  const salt=await bcrypt.genSalt()
  const hashpwd=await bcrypt.hash(req.body.password,salt)

  const usr={Email:req.body.mail,Password:hashpwd}
  user.push(usr);
  u.push(usr);
  const obj=JSON.stringify(user);
  //console.log(user);
 
    fs.writeFileSync('output.txt', obj);


   res.render('index.pug', { title: 'Hey'})

})
app.get('/login', function (req, res) {
  res.render('login.pug');
  console.log(u[0]);
})
app.get('/logout.pug', function (req, res) {
  res.render('logout.pug');
  console.log(u[0]);
})

app.post('/login',async(req,res)=>{

   console.log(u[0],req.body.mail);
const ur=user.find((data)=>data.Email===req.body.mail);
if(ur==null){
  return res.status(400).send("can't find");
}
else{
 if(await bcrypt.compare(req.body.password,ur.Password)){
res.status(200).render('logout.pug');
 }
  
}

})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
