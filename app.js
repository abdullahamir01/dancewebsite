const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/dancecontact')
const port = 8000;

// define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    qualification: String
  });
  const contact = mongoose.model('contact', contactSchema);

app.use( express.static('static'))
app.use(express.urlencoded())

app.set("view engine",'pug')
app.set('views',path.join(__dirname,'views'))

//ENDPOINTS
app.get('/', (req, res) => {
    const con = 'this is best content on internet so use it wisely'
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})


app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('this item has been saved to database')
    }).catch(()=>{
        res.status(200).send("item was not saved to database");
    })
    // res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port, () => {
    console.log(`the app has been started successfully on port ${port}`);
})