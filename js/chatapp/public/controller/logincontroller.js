
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
            if (response.status == 200) {/**status 200 indicates ok */
                console.log("successfull");/**if status=200 then it shows successfull */
                $scope.message = "login Successful";
                //    $state.go('home');
                var token=response.data.token;
                localStorage.setItem("token",token);/**set the token into the local storage */
                var id=response.data.userid;
                localStorage.setItem("id",id);/**set the userid to the local storage */
                var username=response.data.username;

                localStorage.setItem("username",username);/**set the username to the local storage */

                               var username=response.data.username;
                               localStorage.setItem("username",username);


                $location.path('/home');/**move the path to home page */
            }
            else if (response.status == 400) {/**status=400 indicates Bad request */
                $scope.message = "login Unsuccessful";/**The scope is the binding part between the HTML (view) and the JavaScript (controller).

                */
            }
        },function(response){
            console.log(response);
            $scope.message=response.data.message;
            $scope.message="login unsuccessfull";
        })
       

    }

});