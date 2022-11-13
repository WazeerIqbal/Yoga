//1-1st we do do 'npm init' because firest we create package.json file because in future the dependencies we are going to are install in package.json folder

//2-Now in 2nd step we install express using 'npm install express' because it provide routes
//3-In view folder we place our our template
//4- we create static folder because through this we can access static files 


//This is a static file stuff relate to point number 4

const express = require('express');
const path = require('path');
// const fs = require('fs');
const { application } = require('express');
const aap = express('aap');
const port = 80;
//If you want to save using post request, then we use a module called body parser '1st we install' the body parser using 'npm install body-parser'
const bodyParser = require('body-parser');
//In the below part we connect Node js with mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactYoga');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
//Now we crete Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String,
  });

//Now we create model of this Schema
const Contact = mongoose.model('Contact', contactSchema);


//now we server static files

//Express Specific stuff
aap.use('/static', express.static('static')) //For serving static files
aap.use(express.urlencoded())

//pug specific stuff
aap.set('view engine', 'pug'); //set template engine 'pug'
aap.set('views', path.join(__dirname, 'views')); //set the view directory


//Endpoints
aap.get('/', (req, res) => {
    res.status(200).render('home.pug')

})
aap.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')

})
//If you want to save using post request, then we use a module called body parser '1st we install' the body parser using 'npm install body-parser'   
aap.post('/contact', (req, res) => {
    //When Somebody post request on contact page 
    var myData = new Contact(req.body); //Someone post a request on our website the we say save and give the data of req.body 
    //Save return The promise so write then becasue in node all thing are "Asyncronious"
    myData.save().then(()=>{
        res.send('This Data is Stored in DataBase')
    }).catch(()=>{
        res.status(400).send("Item was not saved in the data base")
    }) 


    // res.status(200).render('contact.pug');
})



//Now start the server
aap.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);

});
