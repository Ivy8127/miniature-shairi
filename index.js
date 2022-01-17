const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser') //we use this package to handle form data bc Node does not handle this
//bodyparser is a middleware - they can access request and response objects 
//utlencoded = tells bodyparser to extract data from the form and add them to the body of the request object

app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req,res)=>{
    //dirname is the current working directory
    res.sendFile(__dirname + '/index.html')
})
app.post('/poems',(req,res)=>{
    console.log(req.body)
})
//this is used to create a server that our app on our browser can connect to
app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})
// connect to mongodb through mongoclient

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Ivy8127:Pizzadeluxe8127@shairi.ctlhg.mongodb.net/poem_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("poem_db").collection("devices");
  // perform actions on the collection object
  if(err) return console.error(err)
  console.log('connected...')
  client.close();
});
