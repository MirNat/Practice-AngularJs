(function () {
    "use strict";
    angular.module('chatApp').controller("messageController", function ($scope, $routeParams, $location, messageService, dataShareService) {
            $scope.currentUserId = null;
            $scope.currentUserName = null;
            $scope.selectedRoom = {};
            $scope.isSelectedRoomPublic = null;
            $scope.newMessageText = "";

            $scope.sendMessage = function (newMessageText, sendMessageForm) {
                if (sendMessageForm.$valid) {
                    var newMessage = {
                        authorId: $scope.currentUserId,
                        authorName: $scope.currentUserName,
                        publicRoomId: ($scope.isSelectedRoomPublic) ? $scope.selectedRoom.id : null,
                        privateRoomId: ($scope.isSelectedRoomPublic) ? null : $scope.selectedRoom.id,
                        date: new Date(),
                        text: newMessageText
                    };
                    messageService.create(newMessage).then(function (newMessageId) {
                        newMessage.id = newMessageId;
                        $scope.selectedRoom.messages.push(newMessage);
                        $scope.newMessageText = "";
                    }, function () {
                        console.log('Error. Can`t send message.');
                    });
                }
            };

            $scope.$watch(function () {
                return dataShareService.getSelectedRoom();
            }, function (newValue, oldValue) {
                if (newValue != null) {
                    $scope.selectedRoom = newValue;
                }
            }, true);

            $scope.$watch(function () {
                return dataShareService.getIsSelectedRoomPublic();
            }, function (newValue, oldValue) {
                if (newValue != null) {
                    $scope.isSelectedRoomPublic = newValue;
                }
            }, true);

            $scope.$watch(function () {
                return dataShareService.getCurrentUserId();
            }, function (newValue, oldValue) {
                if (newValue != null) {
                    $scope.currentUserId = newValue;
                }
            }, true);

            $scope.$watch(function () {
                return dataShareService.getCurrentUserName();
            }, function (newValue, oldValue) {
                if (newValue != null) {
                    $scope.currentUserName = newValue;
                }
            }, true);
        }
    );
})();