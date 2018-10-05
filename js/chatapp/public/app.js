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
/**The ngRoute module helps your application to become a Single Page Application.

 */
        // route for the login page
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller:'registercontroller'
            
            
        })
        /**router for dashboard page */
        .when('/home',{
          

            templateUrl:'templates/home.html',
            controller:'homecontroller'

        })
        .when('/peer',{
            templateUrl:'templates/peer.html',
            controller:'peercontroller'



        })
    });
    /**WebSockets is a protocol that provides a bi-directional communication channel. */
        chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
            return socketFactory({
                ioSocket: io.connect('http://localhost:4000')
            });
        }]);
         
    
