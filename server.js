const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //Localhost
      user : 'Ramirez_Tomas',//username for database
      password : '',
      database : 'smart-brain'//database name 
    }
  });

  db.select('*').from('users').then(data =>{
    console.log(data);
  });

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send(database.users);
//Displays how many users we have
});

//signin route
//What user types goes into the request
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//New user is going to be created
app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt) });

//Profile Route
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)} )

//Image route, image entries get added 
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

//API Call
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})




app.listen(3000, () => {
    console.log('Hello app is running on port 3000, working!');
});

// 
//  --> res = this is working
//  signin --> POST = success/fail
// register --> POST = user
// profile/:userId --> GET = user
// image --> PUT --> user

