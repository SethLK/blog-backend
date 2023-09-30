// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session')
const tail = require('express-trailing-slash')

// Import your routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');
const blog = require('./routes/blog')


app.use(
    session({
      secret: 'test-key-just-for-the-project', // Replace with a secure secret key
      resave: false,
      saveUninitialized: true,
    })
  );
// Configure CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Use your routes
app.use(registerRoute);
app.use(loginRoute);
app.use(protectedRoute);
app.use(blog);
app.use(tail())

app.get("/", (req, res) =>{
    if(!req.session.user.username){
      res.send('PLs login')
    }else{
      res.send(`Hello ${req.session.user.username}`)
    }
})

// Start the server
module.exports = app
