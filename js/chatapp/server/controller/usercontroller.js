/**require all the schemas required to run this api */
var usermodel = require('../model/userschema');
var usermodel1=require('../model/chatschema');
var usermodel2=require('../model/peerschema');

// var config=require('../config/config');
const secret = "supersecret";
var jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} password 
 */
/**function to encrypt the password given by the users */
function encrypt(password) {
    var passWord = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    return passWord;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
/**register api to handle the registration process */
var register = function (req, res) {
    try {
        var response = {};/**response in json format */
        var email = req.body.email;/**take email as request in body */
        var db = new usermodel();/**create a database for user schema */
        // console.log('email', typeof req.body.email);
        if (typeof req.body.fname === 'undefined' || typeof req.body.lname === 'undefined') {/**handling the undefined part for firstname */
            throw new Error("Name is required");
        }
        if (typeof req.body.email === 'undefined') {
            throw new Error("Email address is required");/**handling the email undefined part */
        }
/**using regular expressions for handling the erroprs */
        var regex = /^[0-9]+$/;
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!re.test(req.body.email)) {
            throw new Error("some thing went wrong in email....please give a valid emailid.");/**throw error if something went wrong */
        }
        var re = /^[a-zA-Z]\S*$/;
        if (!re.test(req.body.fname) || !re.test(req.body.lname)) {
            throw new Error("Enter correct name");
        }
        var re = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!re.test(req.body.password)) {
            throw new Error("Give a strong password.....");
        }
        //if(typeof req.body.password === 'undefined'){
        //throw new Error("Password is required ");
        //}

        db.fname = req.body.fname;
        db.lname = req.body.lname;
        db.email = req.body.email;
        db.password = encrypt(req.body.password);/**passing the password to password encryption method */

        usermodel.find({ "email": email }, function (err, data) {/**find() method to search the email if already exists or not */
            if (err) {
                response = {
                    "error": true, "message": "error", "err": err
                };
                return res.status(400).send(response);/**status=400 indicates bad request */
            }

            else {
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                if (data.length > 0) {
                    response = { "error": true, "message": "Mail id exist", "err": err };
                    return res.json(response);

                }
                else {
                    db.save(function (err) {/**save the details into the database */

                        if (err) {
                            console.log(err);/**if error exists the it prints the error */
                            response = { "error": true, "message": "error in adding Data " };
                        }
                        else {
                            response = { "error": false, "message": " Data added " };/**if there is no error, then it dispalys Data added into the data base */
                            console.log(db);
                        }
                        return res.status(200).send(response);/**status=200 indicates ok */

                        });
                }
            }
        });
    }
    catch (e) {/**using the try-catch to handle the unknown & unexpected errors */
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad happened. Please contact system administrator"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            });
        }
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
/**login api to handle the login process */
var login = function (req, res) {
    try {
        var email=req.body.email;
        var password;/**only email & password are considered in the login process */
        var response = {};
        usermodel.find({ "email": email, "password": encrypt(req.body.password) }, function (err, data) {
            if (err) {
                response = { "error": true, "message": "error" };/**if error then dispalys the error message */
                return res.json(response);/**returns the response  */
            }

            else if (data.length > 0) {
                var id, token;
                token = jwt.sign({/**generating the token in the local storage */
                    email: email,
                    password: password
                }, secret, {
                        expiresIn: '12d'
                    })
                    console.log(data);
                var userid = data[0]._id;
                var username=data[0].fname;
                

                var response = { "error": false, "message": "login successful", "token": token,"username":username, "userid": userid };
                return res.status(200).send(response);

            }
            else {/**if userlogin without registration,then it displays "first perform registration" */
                response = { "error": true, "message": "First do registration..before going to login.." };
            }
            //return res.status(400).send(response);

        
            var bcrypt = require('bcryptjs');
           var config = require('../config/config');
             var token = jwt.sign({ id: usermodel._id }, secret, {/**generates the secret token */
               expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token, message: response });/**return the response with token,auth & message */
        });
    }
    /**try-catch to handle the unknown errors */
    catch (e) {
        console.log(e);
        if (e instanceof ReferenceError
            || e instanceof TypeError
            || e instanceof SyntaxError
            || e instanceof RangeError) {
            return res.json({
                "error": true,
                "message": "Something bad happened. Please contact system administrator"
            });
        } else {
            return res.json({
                "error": true,
                "message": e.message
            });
        }
    }
}
/**memberlist api to display the friends list */
var memberlist = function (req, res) {
    var userid = req.params.id;
    var response = {};
    var arrlist = [];/**array to add new members into the caht */
    var respo = {};
    usermodel.find({/**checking with the userid */
        "_id": {
            $ne: (userid)
        }
    }, function (err, data) { 
        if (err) {
            response = {
                "message": "error fetching data"/**if error occurs then display the error */
            }
        } else {
            response = {
                "message": data
            };
        }
        if (response.message.length)
            for (var i = 0; i < response.message.length; i++) {
                arrlist.push({/**if no error the push the users into the array */
                    username: response.message[i].fname + ' ' + response.message[i].lname, userid: response.message[i]._id

                });
            }
               // return res.status(400).send(response);
                respo = {  "message":  arrlist };
               return res.status(200).send(respo);
 })
}
/**addhistory api to add messages into the database */
    var addhistory=function(userid,username,message,dateTime){
    {
        var response={};
       var db=new usermodel1();
        db.userid=userid;
        db.username=username;
        db.message=message;
        db.dateTime=dateTime
        db.save(function(err){
        
            if(err)/**if error occurs then display the eroors */
            {
                response={
                    "success":"false",
                    "message":"error hyy",
                    //"error":err
                }
            }
            else{/**if error doesnot occur in adding the messages into the database then  */
                response={
                    "success":"true",
                    "message":"message saved into the database"
                }
            };
        
            console.log(response);
               
    
})
    }
}
/**chatlist api to know the chat history */
    var chatlist=function(req,res){
        var respo={};
        usermodel1.find({},function(err,data){
        if(err){
            respo={"success":"false", "message":"error helloo"}
        }else{
            respo={"success":"true", "message":data}
            return res.status(200).send(respo);/**status=200 indicates ok */

        }


        }
        )
    }
    




    var peertopeerdb=function(senderid,sendername,receiverid,receivername,message,dateTime)
    {
        console.log(senderid);
        console.log('simmi');
        console.log(sendername);
        console.log(receiverid);
        console.log(receivername);
        console.log(message);
        console.log(dateTime);

        var response={};
       var db=new usermodel2();
        db.senderid=senderid;
        db.sendername=sendername;
        db.receiverid=receiverid;
        db.receivername=receivername;
        db.message=message;
        db.dateTime=dateTime
        db.save(function(err){
            if(err)/**if error occurs then display the eroors */
            {
                response={
                    "success":"false",
                    "message":"error hyy",
                    //"error":err
                }
            }
            else{/**if error doesnot occur in adding the messages into the database then  */
                response={
                    "success":"true",
                    "message":"message saved into the database"
                }
            };
        
            console.log(response);
        })
    }
    var peerchatlist=function(req,res){
        console.log("tejaaa........................................");
    var respo={};
    var receiverid=req.params.receiverid;
    var senderid=req.params.senderid;

    usermodel2.find({$or:[{'senderid':senderid,'receiverid':receiverid},{'receiverid':senderid,'senderid':receiverid}]},function(err,data){
    if(err){
        respo={"success":"false", "message":"error helloo in fetching data........................"}
    }else{
        respo={"success":"true", "message":data}
    }

    return res.status(200).send(respo);/**status=200 indicates ok */

    


    }
    )
}





module.exports = {
    register: register,
    login: login,
    memberlist: memberlist,
    addhistory:addhistory,
    chatlist:chatlist,
    peertopeerdb:peertopeerdb,
    peerchatlist:peerchatlist
    
}




