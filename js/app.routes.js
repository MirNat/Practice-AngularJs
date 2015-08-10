(function () {
    "use strict";
    angular.module('chatApp').config(function ($routeProvider) {
        $routeProvider
            .when('/authorization', {
                templateUrl: 'authorization.html',
                controller: 'authorizationController'
            })
            .when('/user', {//'/user/:id/:data*'
                templateUrl: 'chat.html',
                controller: 'chatController'
            })
            .when('/user/public-room/add', {
                templateUrl: '/modals/addEditRoomModalDialog.html'
            })
            .otherwise({
                redirectTo: '/authorization'
            });
    });
})();
