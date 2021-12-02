var con = require('../middleware/connect');
var fs = require('fs');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const { getMaxListeners } = require('process');

require('dotenv').config();

const testMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

exports.signup = (req, res, next) => {
    var userData = req.body;
    console.log(userData.password);
    bcrypt.hash(userData.password, 10)
    .then(hash =>{
      console.log(hash);
      if(testMail.test(userData.email)){
        console.log("ok");
        if(8 < userData.password < 21){
          console.log("ok");
          con.query(
            "INSERT INTO user (userEmail, userPassword, userLastname, userFirstname, grade) VALUES (?,?,?,?,?)", 
            [userData.email, hash, userData.lastname, userData.firstname, userData.grade],
            function(err, results) {
                if(err){
                  return res.status(500).json({console : "Cet email est déjà enregistré"});
                }
                if(results){
                  return res.status(200).json({console : "Signed up"});
                }
            }
          )
        }
        else{
          return res.status(500).json({message : "Le mot de passe ne convient pas."})
        }
      }
      else{
        return res.status(500).json({message : "L'email ne convient pas."})
      }
    })
  }

  exports.login = (req, res, next) => {
    const userData = req.body;
    con.query(
      "SELECT userPassword, userId, grade FROM user WHERE userEmail = ?",
      [userData.email],
      function(err, results){
        if(results){
          bcrypt.compare(userData.password, results[0].userPassword)
          .then(valid =>{
            if(!valid){
              return res.status(500).json({
                console : "Mot de passe incorrect"
              })
            }
            return res.status(200).json({
              console : "connected",
              userId: results[0].userId,
              grade: results[0].grade,
                token: jwt.sign( 
                  { "userId": results[0].userId},
                  `${process.env.ACCESS_SECRET_TOKEN}`,
                  { expiresIn: '24h' })
            })      
          })
        }
        else if(err){
          return res.status(500).json({
            console : "Cet email n'est pas enregistré."
          })
        }
      }
    )
  }