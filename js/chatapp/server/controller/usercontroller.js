var usermodel = require('../model/userschema');
var usermodel1=require('../model/chatschema');
// var config=require('../config/config');
const secret = "supersecret";
var jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} password 
 */
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
var register = function (req, res) {
    try {
        var response = {};
        var email = req.body.email;
        var db = new usermodel();
        // console.log('email', typeof req.body.email);
        if (typeof req.body.fname === 'undefined' || typeof req.body.lname === 'undefined') {
            throw new Error("Name is required");
        }
        if (typeof req.body.email === 'undefined') {
            throw new Error("Email address is required");
        }

        var regex = /^[0-9]+$/;
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!re.test(req.body.email)) {
            throw new Error("some thing went wrong in email....please give a valid emailid.");
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
        db.password = encrypt(req.body.password);

        usermodel.find({ "email": email }, function (err, data) {
            if (err) {
                response = {
                    "error": true, "message": "error", "err": err
                };
                return res.status(400).send(response);
            }

            else {
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                if (data.length > 0) {
                    response = { "error": true, "message": "Mail id exist", "err": err };
                    return res.json(response);

                }
                else {
                    db.save(function (err) {

                        if (err) {
                            console.log(err);
                            response = { "error": true, "message": "error in adding Data " };
                        }
                        else {
                            response = { "error": false, "message": " Data added " };
                            console.log(db);
                        }
                        return res.status(200).send(response);

                        });
                }
            }
        });
    }
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
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
var login = function (req, res) {
    try {
        var email=req.body.email;
       // var fname=req.body.fname;
        //var lname=req.body.lname;
        var password;
        var response = {};
        usermodel.find({ "email": email, "password": encrypt(req.body.password) }, function (err, data) {
            if (err) {
                response = { "error": true, "message": "error" };
                return res.json(response);
            }

            else if (data.length > 0) {
                var id, token;
                token = jwt.sign({
                    email: email,
                    password: password
                }, secret, {
                        expiresIn: '12d'
                    })
                    console.log(data);
                var userid = data[0]._id;
                var username=data[0].fname;
                //var username=data[0].fname;

                var response = { "error": false, "message": "login successful", "token": token,"username":username, "userid": userid };
                return res.status(200).send(response);

            }
            else {
                response = { "error": true, "message": "First do registration..before going to login.." };
            }
            //return res.status(400).send(response);

            //return res.json(response);
            var bcrypt = require('bcryptjs');
           var config = require('../config/config');
             var token = jwt.sign({ id: usermodel._id }, secret, {
               expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token, message: response });
        });
    }
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
var memberlist = function (req, res) {
    var userid = req.params.id;
    var response = {};
    var arrlist = [];
    var respo = {};
    usermodel.find({
        "_id": {
            $ne: (userid)
        }
    }, function (err, data) {
        if (err) {
            response = {
                "message": "error fetching data"
            }
        } else {
            response = {
                "message": data
            };
        }
        if (response.message.length)
            for (var i = 0; i < response.message.length; i++) {
                arrlist.push({
                    username: response.message[i].fname + ' ' + response.message[i].lname, userid: response.message[i]._id

                });
            }
               // return res.status(400).send(response);
                respo = {  "message":  arrlist };
               return res.status(200).send(respo);
 })
}
    var addhistory=function(userid,username,message,dateTime){
    {
        var response={};
       var db=new usermodel1();
        db.userid=userid;
        db.username=username;
        db.message=message;
        db.dateTime=dateTime
        db.save(function(err){
        
            if(err)
            {
                response={
                    "success":"false",
                    "message":"error hyy",
                    //"error":err
                }
            }
            else{
                response={
                    "success":"true",
                    "message":"message saved into the database"
                }
            };
        
            console.log(response);
               
    
})
    }
}
    
    var chatlist=function(req,res){
        var respo={};
        usermodel1.find({},function(err,data){
        if(err){
            respo={"success":"false", "message":"error helloo"}
        }else{
            respo={"success":"true", "message":data}
            return res.status(200).send(respo);

        }

//return res.status(200).send(respo);

        }
        )
    }




module.exports = {
    register: register,
    login: login,
    memberlist: memberlist,
    addhistory:addhistory,
    chatlist:chatlist
    
}




