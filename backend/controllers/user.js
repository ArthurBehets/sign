var con = require('../middleware/connect');
var fs = require('fs');
var bcrypt = require('bcrypt');

//const { getMaxListeners } = require('process');

require('dotenv').config();

const testMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

exports.signup = (req, res, next) => {
    console.log(req.body);
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

}