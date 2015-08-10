(function () {
    "use strict";
    angular.module('chatApp').service("messageService", function ($q, $window, privateRoomService, publicRoomService) {
            var TimeInterval = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.messages));
                    }, TimeInterval);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = JSON.parse($window.localStorage.messages).length + 1;
                            var storedMessages = JSON.parse($window.localStorage.messages);
                            storedMessages.push(item);
                            $window.localStorage.messages = JSON.stringify(storedMessages);
                            if (item.publicRoomId) {
                                var promiseGetPublicRoomById = publicRoomService.getById(item.publicRoomId);
                                promiseGetPublicRoomById.then(function (publicRoom) {
                                    if (publicRoom) {
                                        publicRoom.messages.push(item);
                                        var promiseUpdatePublicRoom = publicRoomService.update(publicRoom);
                                        promiseUpdatePublicRoom.then(function (isUpdated) {
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
                            } else {
                                var promiseGetPrivateRoomById = privateRoomService.getById(item.privateRoomId);
                                promiseGetPrivateRoomById.then(function (privateRoom) {
                                    if (privateRoom) {
                                        privateRoom.messages.push(item);
                                        var promiseUpdatePrivateRoom = privateRoomService.update(privateRoom);
                                        promiseUpdatePrivateRoom.then(function (isUpdated) {
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
                            }
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create message because of wrong function`s parameter - item.');
                        }
                    }, TimeInterval);
                });
            };
        }
    );
})();
/*
 self.update = function (item) {
 return $q(function (resolve, reject) {
 setTimeout(function () {
 if (item) {
 var promiseDeleteById = self.deleteById(item.id);
 promiseDeleteById.then(function (resultOfDeletion) {
 if (resultOfDeletion) {
 $window.localStorage.messages = $window.localStorage.messages.concat(JSON.stringify(item));
 resolve(true);
 } else {
 reject(false);
 }
 });
 } else {
 console.log('Error. Can`t update message because of wrong function`s parameter - item.');
 }
 }, TimeInterval);
 });
 };

 self.deleteById = function (itemId) {
 return $q(function (resolve, reject) {
 setTimeout(function () {
 if (itemId) {
 var storedMessages = JSON.parse($window.localStorage.messages);
 for (var i = 0; i < storedMessages.length; i++) {
 if (storedMessages[i].id === itemId) {
 storedMessages.splice(i, 1);
 }
 }
 $window.localStorage.messages = JSON.stringify(storedMessages);
 resolve(true);
 } else {
 console.log('Error. Can`t delete message because of wrong function`s parameter - itemId.');
 }
 }, TimeInterval);
 });
 };

 self.getById = function (itemId) {
 return $q(function (resolve, reject) {
 setTimeout(function () {
 if (itemId) {
 var promiseGetAllMessages = self.getAll();
 var message = {};
 promiseGetAllMessages.then(function (messages) {
 message = messages.filter(function (item) {
 return item.id == itemId;
 })[0];
 if (message) {
 resolve(message);
 } else {
 reject(message);
 }
 });
 } else {
 console.log('Error. Can`t delete message because of wrong function`s parameter - itemId.');
 }
 }, TimeInterval);
 });
 }*/
