/**
 * Created by natallia.mireyka on 07.08.2015.
 */
(function () {
    "use strict";
    angular.module('chatApp').service("dataShareService", function () {
        var _selectedRoom = {};
        var _isSelectedRoomPublic = null;
        var _currentUserId = null;
        var _currentUserName = null;

        return {
            getSelectedRoom: function () {
                return _selectedRoom;
            },
            setSelectedRoom: function (room) {
                _selectedRoom = room;
            },
            getIsSelectedRoomPublic: function () {
                return _isSelectedRoomPublic;
            },
            setIsSelectedRoomPublic: function (isPublic) {
                _isSelectedRoomPublic = isPublic;
            },
            getCurrentUserId: function () {
                return _currentUserId;
            },
            setCurrentUserId: function (id) {
                _currentUserId = id;
            },
            getCurrentUserName: function () {
                return _currentUserName;
            },
            setCurrentUserName: function (name) {
                _currentUserName = name;
            }
        };
    });
})();