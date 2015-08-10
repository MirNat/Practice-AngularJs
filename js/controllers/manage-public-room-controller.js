(function () {
    "use strict";
    angular.module('chatApp').controller("managePublicRoomController", function ($scope, $modal, $window, publicRoomService, dataShareService) {
            $scope.currentUserId = null;
            $scope.rooms = [];
            $scope.roomTypeName = 'Public Room';
            $scope.confirmedSearchRoomName = '';
            $scope.searchedRoomName = '';

            $scope.searchRoom = function(searchForm){
                if (searchForm.$valid) {
                    $scope.confirmedSearchRoomName =  $scope.searchedRoomName;
                }
            };

            $scope.showAddRoomModal = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'modals/addEditRoomModalDialog.html',
                    controller: 'publicRoomController',
                    resolve: {
                        isEditMode: function () {
                            return false;
                        },
                        roomId:  function () {
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
                    controller: 'publicRoomController',
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
                    controller: 'publicRoomController',
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
                    } else {
                        console.log('Error. Public room was not deleted.');
                    }
                });
            };

            $scope.showSelectedRoom = function (selectedRoomId) {
                var promiseGetSelectedPublicRoomById = publicRoomService.getById(selectedRoomId);
                promiseGetSelectedPublicRoomById.then(function (selectedRoom) {
                    dataShareService.setSelectedRoom(selectedRoom);
                    dataShareService.setIsSelectedRoomPublic(true);
                }, function () {
                    console.log('Error. Can`t show selected public room.');
                });
            };

            $scope.$watch(function () {
                return dataShareService.getCurrentUserId();
            }, function (newValue, oldValue) {
                if (newValue != null) {
                    $scope.currentUserId = newValue;
                    var promiseGetRoomsList = publicRoomService.getAllInViewModelsFormatByUserId($scope.currentUserId);
                    promiseGetRoomsList.then(function (rooms) {
                        $scope.rooms = rooms;
                    }, function () {
                        console.log('Error. Can`t set public rooms list of current user.');
                    });
                }
            }, true);
        }
    )
    ;
})();