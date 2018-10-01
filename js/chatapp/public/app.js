// create the module and name it scotchApp
var chatApp = angular.module('chatApp', ['ngRoute','btford.socket-io']);

// configure our routes
chatApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'templates/login.html',
            controller:'logincontroller'
        
        })

        // route for the about page
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller:'registercontroller'
            
            
        })
        .when('/home',{
          

            templateUrl:'templates/home.html',
            controller:'homecontroller'

        })
    });
        chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
            return socketFactory({
                ioSocket: io.connect('http://localhost:4000')
            });
        }]);
         
    
