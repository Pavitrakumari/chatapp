var express= require('express');
var router=express.Router();
//var app = express();
var users=require('../controller/usercontroller.js');
var auth=require('../../authentication');
router.get('/users/:id/userlist',auth,users.memberlist);
router.get('/chatlist',auth,users.chatlist);
router.get('/peerchatlist/:receiverid/and/:senderid',auth,users.peerchatlist);
module.exports=router;
//router.get('/personalChatlist/:receiverid/and/:senderid',auth,users.personalChatlist);
