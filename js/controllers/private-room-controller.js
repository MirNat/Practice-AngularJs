(function () {
    "use strict";
    angular.module('chatApp').controller("privateRoomController", function ($scope, $modal, $modalInstance, privateRoomService, userService, dataShareService, isEditMode, roomId) {
        $scope.currentUserId = dataShareService.getCurrentUserId();
        $scope.isEditMode = isEditMode;
        $scope.allUsers = [];
        $scope.room = {id: undefined, name: "", users: [], messages: []};
        $scope.isPublicRoom = false;

        userService.getAll().then(function (users) {
            $scope.allUsers = users;
            var currentUser = $scope.allUsers.filter(function (item) {
                return item.id ==  $scope.currentUserId;
            })[0];
            $scope.room.users.push(currentUser);
        }, function () {
            console.log('Error! Can`t get all users to show in private room modal dialog.');
        });

        if (roomId) {
            privateRoomService.getById(roomId).then(function (privateRoom) {
                $scope.room = privateRoom;
            }, function () {
                console.log('Error. Can`t get private room to edit.');
            });
        }

        $scope.addRoom = function (addEditRoomModalForm) {
            if (addEditRoomModalForm.$valid) {
                if ($scope.isEditMode) {
                    privateRoomService.update($scope.room).then(function (editedPrivateRoom) {
                        if (editedPrivateRoom) {
                            $modalInstance.close($scope.room);
                        }
                    }, function () {
                        console.log('Error. Can`t update private room.');
                    });
                } else {
                    privateRoomService.create($scope.room).then(function (createdPrivateRoomId) {
                        if (createdPrivateRoomId) {
                            $scope.room.id = createdPrivateRoomId;
                            $modalInstance.close($scope.room);
                        }
                    }, function () {
                        console.log('Error. Can`t create private room.');
                    });
                }
            }
        };

        $scope.deleteRoom = function () {
            privateRoomService.deleteByIdFromUser($scope.room.id, $scope.currentUserId).then(function (isDeleted) {
                $modalInstance.close(isDeleted);
            }, function () {
                console.log('Error. Can`t update private room.');
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();