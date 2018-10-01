
chatApp.controller('logincontroller', function ($scope, $http, $location) {

    console.log('login');
    $scope.user = {
        'email': '',
        'password': ''
    }
    //console.log($scope.user);

    console.log($scope.user);
    $scope.login = function () {
        console.log("login credential process", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
            if (response.status == 200) {
                console.log("successfull");
                $scope.message = "login Successful";
                //    $state.go('home');
                var token=response.data.token;
                localStorage.setItem("token",token);
                var id=response.data.userid;
                localStorage.setItem("id",id);
                var username=response.data.username;
                //localStorage.setItem('uname', response.data.username)
               // console.log(username);
                localStorage.setItem("username",username);
               
                $location.path('/home');
            }
            else if (response.status == 400) {
                $scope.message = "login Unsuccessful";
            }
        })
        console.log(data);

    }

});