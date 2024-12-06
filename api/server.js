const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : process.env.db_host,
      port : process.env.db_port,
      user : process.env.db_user,
      password : process.env.db_password,
      database : process.env.db_name
    }
  });


const app = express();

const port = 3000;
const saltRounds = 10;

app.use(express.json());
app.use(cors({
  origin: 'https://carpp.online', 
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.options('*', cors());

app.get('/api', (req, res) => res.send('success'))
app.post('/api/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/api/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });
app.get('/api/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/api/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/api/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})

console.error