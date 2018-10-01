var express= require('express');
var router=express.Router();
var app = express();
var users=require('../controller/usercontroller.js');
//var auth=require('../authentication');
var authRoute=require('./authRoute');
router.post("/login", users.login);
router.post('/register', users.register);

//router.get('/details', users.details);
router.use('/auth',authRoute);
//router.grt("/dashboard", auth,users.dashboard);

//router.post("/message/send", auth,users.messageSend);

// ConnectDB();

module.exports=router;