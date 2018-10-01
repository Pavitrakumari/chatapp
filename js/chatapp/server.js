var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var users=require('./server/controller/usercontroller.js');


//var router = express.Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost:27017/data')
mongoose.connect('mongodb://localhost:27017/data',{ useNewUrlParser: true,useCreateIndex:true });

var router = require('./server/route/route');

app.use('/', router);
var socket=require('socket.io');
//app.set('view engine',ejs);
app.use(express.static('./public'));
//app.get('/',(req,res)=>{
  //  res.send('hello world');
//})
var server=app.listen(4000);
console.log("Listening to PORT 4000");
var io=socket(server);
// io.on('connection', function(client) {

//     console.log("System working");
//     client.on('tobackend', function(data) {
//         client.in(data.receiverid).emit( data.receiverid,data.msg);
//         console.log(data);
//         client.emit('toclient',data);

io.on('connection', function(client){

  console.log('A user enter in the room');

  client.on('disconnect', function(){
      console.log("socket disconnected ")
  })


  client.on('tobackend', function(data) {
             
     users.addhistory(data.userid, data.username, data.message, data.dateTime);
      
     // console.log(chathistory);
      io.emit('toclient', data);
      // client.broadcast.emit('chatroomClient', data);
  })
});



        




















      

/**var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const Socket = require('socket.io')
var users = require('./api/controller/userController');
//var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserData', { useNewUrlParser: true });

var router = require('./api/routes/routes')
app.use('/', router);
app.use(express.static('./public'));

var server = app.listen(4100);
console.log("Listening to PORT 4100");

var io = Socket(server);

io.on('connection', function(client){

    console.log('A user enter in the room');

    client.on('disconnect', function(){
        console.log("socket disconnected ")
    })


    client.on('chatRoomBackend', function(data) {
               
       users.chatAddHistory(data.userid, data.username, data.message, data.dateTime);
        
       // console.log(chathistory);
        io.emit('chatroomClient', data);
        // client.broadcast.emit('chatroomClient', data);
    })
});
	
	
	
 */