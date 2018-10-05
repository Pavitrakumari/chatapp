chatApp.controller('registercontroller', function($scope, $http){
    console.log('register');
    $scope.user={
        'fname':'',
        'lname':'',
        'email':'',
        'password':''
    }
    console.log($scope.user);
    $scope.register=function(){
        console.log("registration process",$scope.user);
        $http({
            method:'POST',/**the method used in registration are POST */
            url:'/register',
            data:$scope.user
        }).then(function(response){
            console.log(response);
            //console.log(response.data.success);
            if(response.status==200){
                console.log("successfull");/**if status=200 then it means ok */
                $scope.message="";
            }
            else if(response.status==400){/**if status=400 it indicates ad request */
                $scope.message="Register Unsuccessful";
            }
        
        },function(response){
            console.log(response);
            $scope.message=response.data.message;
            $scope.message="registration unsuccessfull";
        })
        
    }
});
