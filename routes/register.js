var express = require('express');
const { compile } = require('morgan');
var router = express.Router();
var ejs = require('ejs');

var user_data = [];

router.get('/', (req, res) => {
  res.render("register")
})

/* GET users listing. */
router.post('/', function(req, res) {
    console.log(req.body);
    
    let name = req.body.fullname;
    let email = req.body.email;
    let pwd = req.body.pwd;

    console.log("name : " + name + " email : " + email + " pwd : " + pwd)

    let user_list = {
      "name" : name,
      "email" : email,
      "pwd" : pwd
    };  
     
    user_data.push(user_list)
    console.log(user_data)

    res.redirect("/login")


});

module.exports = router;
