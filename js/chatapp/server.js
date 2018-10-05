/**require all the things required to run the server */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");/**The bodyParser object exposes various factories to create middlewares. */
var users=require('./server/controller/usercontroller.js');


//var router = express.Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/data',{ useNewUrlParser: true,useCreateIndex:true });/**connect the mongodb to the server */
/**The ngRoute module routes your application to different pages without reloading the entire application.

 */
var router = require('./server/route/route');

app.use('/', router);
var socket=require('socket.io');

app.use(express.static('./public'));

var server=app.listen(4000);
console.log("Listening to PORT 4000");

var io=socket(server);

io.on('connection', function(client){

  console.log('A user enter in the room');

  client.on('disconnect', function(){
      console.log("socket disconnected ")
  })


  client.on('tobackend', function(data) {
             
     users.addhistory(data.userid, data.username, data.message, data.dateTime);
      
      io.emit('toclient', data);
  })
  client.on('peerbackend', function(data) {
    console.log("inn");
    users.peertopeerdb(data.senderid, data.sendername, data.receiverid,data.receivername,data.message, data.dateTime);
    io.emit(data.receiverid, data);

  })
});




        




















      

