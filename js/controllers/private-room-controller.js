(function () {
    "use strict";
    angular.module('chatApp').controller("privateRoomController", function ($scope, $modal, $modalInstance, privateRoomService, userService, dataShareService, editMode, roomId) {
        $scope.currentUserId = dataShareService.getCurrentUserId();
        $scope.editMode = editMode;
        $scope.allUsers = [];
        $scope.room = {id: undefined, name: "", users: [], messages: []};
        $scope.selectedUsers = [];

        var promiseGetAllUsers = userService.getAll();
        promiseGetAllUsers.then(function (users) {
            $scope.allUsers = users;
        }, function () {
            console.log('Error! Can`t get all users to show in private room modal dialog.');
        });

        if (roomId) {
            var promiseGetPrivateRoomById = privateRoomService.getById(roomId);
            promiseGetPrivateRoomById.then(function (privateRoom) {
                $scope.room = privateRoom;
                if ($scope.editMode) {
                    $scope.selectedUsers = privateRoom.users;
                }
            }, function () {
                console.log('Error. Can`t get private room to edit.');
            });
        }

        $scope.addRoom = function (room) {
            if (modalRoomForm.$valid) {
                $scope.room.users = $scope.selectedUsers;
                if (editMode) {
                    var promiseUpdatePrivateRoom = privateRoomService.update($scope.room);
                    promiseUpdatePrivateRoom.then(function (editedPrivateRoom) {
                        //$modalInstance.close(editedPrivateRoom);
                    }, function () {
                        console.log('Error. Can`t update private room.');
                    });
                } else {
                    var promiseCreatePrivateRoom = privateRoomService.update($scope.room);
                    promiseCreatePrivateRoom.then(function (createdPrivateRoom) {
                        //$modalInstance.close(createdPrivateRoom);
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

        $scope.isUsersSelected = function (id) {
            var index = $scope.selectedUsers.indexOf(id);
            if (index > -1) {
                $scope.selectedUsers.splice(index, 1);
            } else {
                $scope.selectedUsers.push(id);
            }
        };
    });
})();