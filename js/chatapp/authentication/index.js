
var jwt=require('jsonwebtoken');


const secret="supersecret";/**to generate a secret code */
var auth=function(req,res,next){
    var token=req.headers['token'];
    var respo={
        'message':'Unauthorised entry'/**display the message if token is invalid */
    };
    console.log("in auth",token);
    jwt.verify(token,secret,function(err,decoded){/**verify() is used to verify the token */
        if(err)
        {
            console.log(err);/**if there exists any error , then error will be displayed */
            return res.status(401).send(respo);/**401-gives the unauthorised error */
        }
        else{
            console.log(decoded);/**if token is verified then it decodes the token */
            next();
        }
    });


}
module.exports=auth;/**8expoting the auth class*/