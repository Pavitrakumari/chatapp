chatApp.controller('homecontroller', function ($scope, $http,$location,SocketService) {
    var token = localStorage.getItem("token");/**get the token from local storage */
    var userid=localStorage.getItem("id");/**get the user id from local storage */
    var username=localStorage.getItem("username");/**get the user name from local storage  */
   $scope.currentuserid=userid;

    console.log("id is"+userid)
       var arrlist=[];
       SocketService.emit('tobackend','hiii hello');
       SocketService.on('toclient', function(msg) {
        console.log(msg);
    });


    $http({
        method: 'GET',/**using get method */
        url: 'auth/users/'+userid+'/userlist',/**passing the url  */
        headers:{
            'token': token
        }
    }).then(function (response) {
        console.log(response.data.message[0])
        for(var i=0;i<(response.data.message).length;i++){
            arrlist.push(response.data.message[i].username)
        }
        console.log(arrlist);
    })
       $scope.arrlist = arrlist;
// $scope.logout=function () {
//            localStorage.removeItem(token);
//            localStorage.removeItem(userid);
//            $location.path('/login');
    
//          }

         $scope.chatlist = [];
         $scope.add = function(){/**add method to add the messages to the front end */
/**if message length is not '0' , then backend receives the userid,username,message & time */
        if($scope.message.length !== 0){
        SocketService.emit('tobackend', {'userid': userid, 'username': username, 'message': $scope.message, 'dateTime': new Date()});
        
        }
        $scope.message=null;/** this is used to make the box cleard after sending the messages */
    }

    $http({

        method: 'GET',
        url: '/auth/chatlist',/**path for url */
        headers: {
            'token': token
          }
          })  .then(function(response){
               console.log(response.data.message);
               $scope.chatlist = response.data.message;
            })
            SocketService.on('toclient', function(msg) {
                 console.log(msg);
                 $scope.chatlist.push(msg)/**push the messages to the chatlist */
    });


   
         
})
   
    