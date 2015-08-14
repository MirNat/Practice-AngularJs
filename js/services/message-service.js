(function () {
    "use strict";
    angular.module('chatApp').service("messageService", function ($q, $window, privateRoomService, publicRoomService) {
            var TIME_INTERVAL = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.messages));
                    }, TIME_INTERVAL);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = ++JSON.parse($window.localStorage.messages).length;
                            var storedMessages = JSON.parse($window.localStorage.messages);
                            storedMessages.push(item);
                            $window.localStorage.messages = JSON.stringify(storedMessages);
                            if (item.publicRoomId) {
                                self.addMessageToPublicRoom(item);
                            } else {
                                self.addMessageToPrivateRoom(item);
                            }
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create message because of wrong function`s parameter - item.');
                        }
                    }, TIME_INTERVAL);
                });
            };

            self.addMessageToPublicRoom = function (item) {
                publicRoomService.getById(item.publicRoomId).then(function (publicRoom) {
                    if (publicRoom) {
                        publicRoom.messages.push(item);
                        publicRoomService.update(publicRoom).then(function (isUpdated) {
                            if (isUpdated) {
                                resolve(true);
                            } else {
                                console.log('Error. Public room does not updated with new message.');
                            }
                        });
                    } else {
                        console.log('Error. Can`t get public room to send the message to it.');
                    }
                });
            };

            self.addMessageToPrivateRoom = function (item) {
                privateRoomService.getById(item.privateRoomId).then(function (privateRoom) {
                    if (privateRoom) {
                        privateRoom.messages.push(item);
                        privateRoomService.update(privateRoom).then(function (isUpdated) {
                            if (isUpdated) {
                                resolve(true);
                            } else {
                                console.log('Error. Private room does not updated with new message.');
                            }
                        });
                    } else {
                        console.log('Error. Can`t get private room to send the message to it.');
                    }
                });
            };
        }
    );
})();
