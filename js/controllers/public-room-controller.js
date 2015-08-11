(function () {
    "use strict";
    angular.module('chatApp').controller("publicRoomController", function ($scope, $modal, $modalInstance, publicRoomService, userService, dataShareService, isEditMode, roomId) {
        $scope.currentUserId = dataShareService.getCurrentUserId();
        $scope.isEditMode = isEditMode;
        $scope.allUsers = [];
        $scope.room = {id: undefined, name: "", users: [], messages: []};
        $scope.isPublicRoom = true;

        var promiseGetAllUsers = userService.getAll();
        promiseGetAllUsers.then(function (users) {
            $scope.allUsers = users;
            var currentUser = $scope.allUsers.filter(function (item) {
                return item.id ==  $scope.currentUserId;
            })[0];
            $scope.room.users.push(currentUser);
        }, function () {
            console.log('Error! Can`t get all users to show in public room modal dialog.');
        });

        if (roomId) {
            var promiseGetPublicRoomById = publicRoomService.getById(roomId);
            promiseGetPublicRoomById.then(function (publicRoom) {
                $scope.room = publicRoom;
            }, function () {
                console.log('Error. Can`t get public room to edit.');
            });
        }

        $scope.addRoom = function (addEditRoomModalForm) {
            if (addEditRoomModalForm.$valid) {
                if ($scope.isEditMode) {
                    var promiseUpdatePublicRoom = publicRoomService.update($scope.room);
                    promiseUpdatePublicRoom.then(function (editedPublicRoom) {
                        if (editedPublicRoom) {
                            $modalInstance.close($scope.room);
                        }
                    }, function () {
                        console.log('Error. Can`t update public room.');
                    });
                } else {
                    var promiseCreatePublicRoom = publicRoomService.create($scope.room);
                    promiseCreatePublicRoom.then(function (createdPublicRoomId) {
                        if (createdPublicRoomId) {
                            $scope.room.id = createdPublicRoomId;
                            $modalInstance.close($scope.room);
                        }
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
    });
})();