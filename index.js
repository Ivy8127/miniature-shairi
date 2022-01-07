const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
app.post('/poems',(req,res)=>{
    console.log(req.body)
})
app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})