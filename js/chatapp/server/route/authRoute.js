var express= require('express');
var router=express.Router();
//var app = express();
var users=require('../controller/usercontroller.js');
var auth=require('../../authentication');
router.get('/users/:id/userlist',auth,users.memberlist);
router.get('/chatlist',auth,users.chatlist);
module.exports=router;

