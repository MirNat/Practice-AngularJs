(function () {
    "use strict";
    angular.module('chatApp').controller("privateRoomController", function ($scope, $modal, $modalInstance, privateRoomService, userService, dataShareService, isEditMode, roomId) {
        $scope.currentUserId = dataShareService.getCurrentUserId();
        $scope.isEditMode = isEditMode;
        $scope.allUsers = [];
        $scope.room = {id: undefined, name: "", users: [], messages: []};
        $scope.isPublicRoom = false;

        var promiseGetAllUsers = userService.getAll();
        promiseGetAllUsers.then(function (users) {
            $scope.allUsers = users;
            var currentUser = $scope.allUsers.filter(function (item) {
                return item.id ==  $scope.currentUserId;
            })[0];
            $scope.room.users.push(currentUser);
        }, function () {
            console.log('Error! Can`t get all users to show in private room modal dialog.');
        });

        if (roomId) {
            var promiseGetPrivateRoomById = privateRoomService.getById(roomId);
            promiseGetPrivateRoomById.then(function (privateRoom) {
                $scope.room = privateRoom;
            }, function () {
                console.log('Error. Can`t get private room to edit.');
            });
        }

        $scope.addRoom = function (addEditRoomModalForm) {
            if (addEditRoomModalForm.$valid) {
                if ($scope.isEditMode) {
                    var promiseUpdatePrivateRoom = privateRoomService.update($scope.room);
                    promiseUpdatePrivateRoom.then(function (editedPrivateRoom) {
                        if (editedPrivateRoom) {
                            $modalInstance.close($scope.room);
                        }
                    }, function () {
                        console.log('Error. Can`t update private room.');
                    });
                } else {
                    var promiseCreatePrivateRoom = privateRoomService.create($scope.room);
                    promiseCreatePrivateRoom.then(function (createdPrivateRoomId) {
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
            var promiseDeletePrivateRoom = privateRoomService.deleteByIdFromUser($scope.room.id, $scope.currentUserId);
            promiseDeletePrivateRoom.then(function (isDeleted) {
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