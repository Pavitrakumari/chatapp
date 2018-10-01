/**module.exports=auth;
var auth=function(req,res,next){
    next();
}*/
var jwt=require('jsonwebtoken');
//  var config = require('../config/config');

const secret="supersecret"
var auth=function(req,res,next){
    var token=req.headers['token'];
    var respo={
        'message':'Unauthorised entry'
    };
    console.log("in auth",token);
    jwt.verify(token,secret,function(err,decoded){
        if(err)
        {
            console.log(err);
            return res.status(401).send(respo);
        }
        else{
            console.log(decoded);
            next();
        }
    });


}
module.exports=auth;