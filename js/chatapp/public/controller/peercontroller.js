chatApp.controller('peercontroller', function ($scope, $http,$location,SocketService) {
    var token = localStorage.getItem("token");/**get the token from local storage */
    var curruserid = localStorage.getItem("id");/**get the currentuserid from local storage */
    var currName = localStorage.getItem("username");/**get the token from local storage */
    var receiverid = localStorage.getItem("receiverid");
    var receivername = localStorage.getItem("receivername");
   console.log(curruserid);
   $scope.close=function(){
       $location.path("/home");
       localStorage.removeItem('receiverid');
       localStorage.removeItem('receivername');


   }
   uName=[];
   uName.push(currName+":"+receivername);
   $scope.userName=uName;
   $scope.chatlist=[];
   $scope.send=function(){
       console.log("sendddddddddddddddddd");
       console.log($scope.message);
    SocketService.emit('peerbackend',{'senderid':curruserid,'sendername':currName,'receiverid':receiverid,'receivername':receivername, 'message': $scope.message, 'dateTime': new Date()});
$scope.chatlist.push({'senderid':curruserid,'sendername':currName,'receiverid':receiverid,'receivername':receivername,'message': $scope.message, 'dateTime': new Date()})
     $scope.message=null; 
 }
  $http({
        method: 'GET',/**using get method */
        url: 'auth/peerchatlist/'+receiverid+'/and/'+curruserid,/**passing the url  */
       // url: '/auth/personalChatlist/'+receiverId+'/and/'+currUserid,

        headers:{
            'token': token
        }
    }).then(function (response) {
        console.log(response.data.message)
               $scope.chatlist = response.data.message;
            //    $scope.chatlist = response.data.dateTime;

            
            })
            SocketService.on('curruserid', function(msg) {
                 console.log(msg);
                 if(curruserid==receiverid){
                 $scope.chatlist.push(msg)/**push the messages to the chatlist */
                 console.log(msg);
                 }

    });
    $scope.currentuserid=curruserid;
    


   
         
})
   
    