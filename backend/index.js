require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require("./Routes/Authroutes");
const invoiceRoutes = require("./Routes/Invoiceroute");
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require('cors');
const app = express();

connectDB();


app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true, 
    })
  );
  

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


app.get('/', (req, res) => {
    res.send(`
        <h1>Hello Server</h1>
        <a href='/auth/google'>Login with Google</a>
        
    `);
});


app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      const user = req.user;
      const email = user.emails[0].value; 
      const name = user.displayName;
  
      res.redirect(`http://localhost:5173?success=true&email=${email}&name=${name}`);
     
    }
  );
  
  app.get("/auth/login/success", (req, res) => {
    if (req.isAuthenticated()) {
      console.log("Authenticated user:", req.user);
      res.json({
        success: true,
        user: {
          email: req.user.emails[0].value,
          name: req.user.displayName,
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Not authenticated" });
    }
  });
  
  
  
  app.get("/profile", (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
  });
  
  app.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error logging out");
      }
      res.redirect("/");
    });
  });
  
  

app.use('/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = 5000;

app.listen(PORT, ()=>{  
    console.log("server is running");
})