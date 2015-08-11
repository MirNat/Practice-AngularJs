(function () {
    "use strict";
    angular.module('chatApp').controller("chatController", function ($scope, $routeParams, $location, userService, dataShareService) {
            $scope.currentUserName = dataShareService.getCurrentUserName();
            $scope.currentUserId = dataShareService.getCurrentUserId();
            $scope.allUsers = [];

            if (!dataShareService.getCurrentUserId()) {
                if ($routeParams["id"]) {
                    dataShareService.setCurrentUserId($routeParams["id"]);
                    $scope.currentUserId = $routeParams["id"];
                    if (!$scope.currentUserName) {
                        var promiseGetCurrentUser = userService.getById($routeParams["id"]);
                        promiseGetCurrentUser.then(function (currentUser) {
                            $scope.currentUserName = currentUser.name;
                            dataShareService.setCurrentUserName($scope.currentUserName);
                        }, function () {
                            console.log('Error. Can`t get current user to display.');
                        });
                    }
                } else {
                    $location.path('/authorize');
                }
            }
            var promiseGetAllUsers = userService.getAll();
            promiseGetAllUsers.then(function (users) {
                $scope.allUsers = users;
            }, function () {
                console.log('Error. Can`t get all users to display users list.');
            });
        }
    );
})();