(function () {
    "use strict";
    angular.module('chatApp').controller("publicRoomController", function ($scope, $modal, $modalInstance, publicRoomService, userService, dataShareService, editMode, roomId) {
        $scope.currentUserId = dataShareService.getCurrentUserId();
        $scope.editMode = editMode;
        $scope.allUsers = [];
        $scope.room = {id: undefined, name: "", users: [], messages: []};
        $scope.selectedUsers = [];

        var promiseGetAllUsers = userService.getAll();
        promiseGetAllUsers.then(function (users) {
            $scope.allUsers = users;
        }, function () {
            console.log('Error! Can`t get all users to show in public room modal dialog.');
        });

        if (roomId) {
            var promiseGetPublicRoomById = publicRoomService.getById(roomId);
            promiseGetPublicRoomById.then(function (publicRoom) {
                $scope.room = publicRoom;
                if ($scope.editMode) {
                    $scope.selectedUsers = publicRoom.users;
                }
            }, function () {
                console.log('Error. Can`t get public room to edit.');
            });
        }

        $scope.addRoom = function (room) {
            if (modalRoomForm.$valid) {
                $scope.room.users = $scope.selectedUsers;
                if (editMode) {
                    var promiseUpdatePublicRoom = publicRoomService.update($scope.room);
                    promiseUpdatePublicRoom.then(function (editedPublicRoom) {
                        //$modalInstance.close(editedPublicRoom);
                    }, function () {
                        console.log('Error. Can`t update public room.');
                    });
                } else {
                    var promiseCreatePublicRoom = publicRoomService.update($scope.room);
                    promiseCreatePublicRoom.then(function (createdPublicRoom) {
                        //$modalInstance.close(createdPublicRoom);
                    }, function () {
                        console.log('Error. Can`t create public room.');
                    });
                }
            }
        };

        $scope.deleteRoom = function () {
            var promiseDeletePublicRoom = publicRoomService.deleteByIdFromUser($scope.room.id, $scope.currentUserId);
            promiseDeletePublicRoom.then(function (isDeleted) {
                $modalInstance.close(isDeleted);
            }, function () {
                console.log('Error. Can`t update public room.');
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