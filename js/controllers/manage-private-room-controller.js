(function () {
    "use strict";
    angular.module('chatApp').controller("managePrivateRoomController", function ($scope, $modal, privateRoomService, dataShareService) {
            $scope.currentUserId = null;
            $scope.rooms = [];
            $scope.roomTypeName = 'Private Room';
            $scope.confirmedSearchRoomName = '';
            $scope.searchedRoomName = '';

            $scope.searchRoom = function (searchForm) {
                if (searchForm.$valid) {
                    $scope.confirmedSearchRoomName = $scope.searchedRoomName;
                }
            };

            $scope.showAddRoomModal = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'modals/addEditRoomModalDialog.html',
                    controller: 'privateRoomController',
                    resolve: {
                        isEditMode: function () {
                            return false;
                        },
                        roomId: function () {
                            return null;
                        }
                    }
                });

                modalInstance.result.then(function (createdRoom) {
                    $scope.rooms.push(createdRoom);
                });
            };

            $scope.showEditRoomModal = function (editedRoomId) {
                var modalInstance = $modal.open({
                    templateUrl: 'modals/addEditRoomModalDialog.html',
                    controller: 'privateRoomController',
                    resolve: {
                        isEditMode: function () {
                            return true;
                        },
                        roomId: function () {
                            return editedRoomId;
                        }
                    }
                });

                modalInstance.result.then(function (updatedRoom) {
                    for (var i in $scope.rooms) {
                        if ($scope.rooms[i].id == updatedRoom.id) {
                            $scope.rooms[i] = updatedRoom;
                            break;
                        }
                    }
                });
            };

            $scope.showDeleteRoomModal = function (deletedRoomId) {
                var modalInstance = $modal.open({
                    templateUrl: 'modals/deleteRoomModalDialog.html',
                    controller: 'privateRoomController',
                    resolve: {
                        isEditMode: function () {
                            return false;
                        },
                        roomId: function () {
                            return deletedRoomId;
                        }
                    }
                });

                modalInstance.result.then(function (isDeleted) {
                    if (isDeleted) {
                        for (var i = 0; i < $scope.rooms.length; i++) {
                            if ($scope.rooms[i].id === deletedRoomId) {
                                $scope.rooms.splice(i, 1);
                            }
                        }
                        dataShareService.setSelectedRoom({id:0, name:"", messages:[]});

                    } else {
                        console.log('Error. Private room was not deleted.');
                    }
                });
            };

            $scope.showSelectedRoom = function (selectedRoomId) {
                privateRoomService.getById(selectedRoomId).then(function (selectedRoom) {
                    dataShareService.setSelectedRoom(selectedRoom);
                    dataShareService.setIsSelectedRoomPublic(false);
                }, function () {
                    console.log('Error. Can`t show selected private room.');
                });
            };


            $scope.currentUserId = dataShareService.getCurrentUserId();
            privateRoomService.getAllInViewModelsFormatByUserId($scope.currentUserId).then(function (rooms) {
                $scope.rooms = rooms;
            }, function () {
                console.log('Error. Can`t set private rooms list of current user.');
            });
        }
    );
})();