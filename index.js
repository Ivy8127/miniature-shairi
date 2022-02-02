const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser') //we use this package to handle form data bc Node does not handle this
//bodyparser is a middleware - they can access request and response objects 
//utlencoded = tells bodyparser to extract data from the form and add them to the body of the request object
app.use(bodyParser.json())
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
// connect to mongodb through mongoclient

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Ivy8127:Pizzadeluxe8127@shairi.ctlhg.mongodb.net/poem_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("poem_db")
  const mashairiCollection = db.collection("mashairi");
  //Read
  app.get('/',(req,res)=>{
    //dirname is the current working directory
    //res.sendFile(__dirname + '/index.html')
  db.collection("mashairi").find().toArray()
    .then(result =>{
        res.render('index.ejs', {poems:result})
    })
    .catch(err => {
        console.error(err)
    })
    
})
//Create
    app.post('/poems',(req,res)=>{
        mashairiCollection.insertOne(req.body)
        .then(result =>{
            res.redirect("/")
        })
        .catch(error => console.error(error))
    }) 
    //update
    app.put('/poems',(req,res)=>{
        mashairiCollection.findOneAndUpdate(
            { title: 'the poem !!' },
            {
                $set: {
                title: req.body.title,
                poem: req.body.poem
                }
            },
            {
                upsert: true
            }
        )
        .then(results =>{
            res.json('success')
        })
        .catch(error =>{
            console.error(error)
        })
    }) 
//this is used to create a server that our app on our browser can connect to
    app.listen(3000, ()=> {
        console.log("Listening on port 3000")
    })
  // perform actions on the collection object
  if(err) return console.error(err)
  //console.log('connected...')
});
