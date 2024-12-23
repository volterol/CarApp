const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const https = require('https');
const fs = require('fs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// periodic pings to clarifai api to keep it warm
// const startPeriodicPings = require('./periodicPings');
// startPeriodicPings();

// SSL certificate files
const privateKey = fs.readFileSync('/etc/letsencrypt/live/carpp.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/carpp.online/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

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

app.use(cors({
  origin: ["https://carpp.online", "http://localhost:3001"], 
  methods: "*",
  allowedHeaders: "*",
  //credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://carpp.online'); // Frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.options('*', cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




app.get('/', (req, res) => res.send('success'))
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server app listening on https://carpp.online:${port}`)
});

console.error