(function () {
    "use strict";
    angular.module('chatApp').controller('authorizationController', function ($scope, $location, userService, dataShareService, dataInitializeService) {
        $scope.user = {
            name: "Admin",
            password: "12345"
        };
        $scope.wrongAuthorized = false;
        $scope.authorize = function (name, password, loginForm) {
            if (loginForm.$valid) {
                var promiseAuthorization = userService.authorize($scope.user.name, $scope.user.password);
                promiseAuthorization.then(function (userId) {
                    $scope.wrongAuthorized = false;
                    dataShareService.setCurrentUserId(userId);
                    dataShareService.setCurrentUserName($scope.user.name);
                    $location.path('/user');
                }, function () {
                    $scope.wrongAuthorized = true;
                });
            }
        };
    });
})();