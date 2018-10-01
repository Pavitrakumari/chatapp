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
            method:'POST',
            url:'/register',
            data:$scope.user
        }).then(function(response){
            console.log(response);
            //console.log(response.data.success);
            if(response.status==200){
                console.log("successfull");
                $scope.message="Registered Successfully";
            }
            else if(response.status==400){
                $scope.message="Register Unsuccessful";
            }
        
        })
    }
});
