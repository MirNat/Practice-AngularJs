(function () {
    "use strict";
    angular.module('chatApp').service("dataShareService", function () {
        var selectedRoom = {};
        var isSelectedRoomPublic = null;
        var currentUserId = null;
        var currentUserName = null;

        return {
            getSelectedRoom: function () {
                return selectedRoom;
            },
            setSelectedRoom: function (room) {
                selectedRoom = room;
            },
            getIsSelectedRoomPublic: function () {
                return isSelectedRoomPublic;
            },
            setIsSelectedRoomPublic: function (isPublic) {
                isSelectedRoomPublic = isPublic;
            },
            getCurrentUserId: function () {
                return currentUserId;
            },
            setCurrentUserId: function (id) {
                currentUserId = id;
            },
            getCurrentUserName: function () {
                return currentUserName;
            },
            setCurrentUserName: function (name) {
                currentUserName = name;
            }
        };
    });
})();