(function () {
    "use strict";
    angular.module('chatApp').service("privateRoomService", function ($q, $window, userService) {
            var TIME_INTERVAL = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.privateRooms));
                    }, TIME_INTERVAL);
                });
            };

            self.getAllInViewModelsFormatByUserId = function (userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        userService.getById(userId).then(function (user) {
                            if (user) {
                                resolve(user.privateRoomViewModels);
                            }
                        }, function () {
                            console.log('Error. Can`t get private rooms list.');
                        });
                    }, TIME_INTERVAL);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = ++JSON.parse($window.localStorage.privateRooms).length;
                            var storedPrivateRooms = JSON.parse($window.localStorage.privateRooms);
                            storedPrivateRooms.push(item);
                            $window.localStorage.privateRooms = JSON.stringify(storedPrivateRooms);
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create private room because of wrong function`s parameter - item.');
                        }
                    }, TIME_INTERVAL);
                });
            };

            self.update = function (item) {
                return $q(function (resolve, reject) {
                        setTimeout(function () {
                            if (item) {
                                self.deleteById(item.id).then(function (resultOfDeletion) {
                                    if (resultOfDeletion) {
                                        var storedPrivateRooms = JSON.parse($window.localStorage.privateRooms);
                                        storedPrivateRooms.push(item);
                                        $window.localStorage.privateRooms = JSON.stringify(storedPrivateRooms);
                                        resolve(true);
                                    } else {
                                        reject(false);
                                    }
                                });
                            } else {
                                console.log('Error. Can`t update private room because of wrong function`s parameter - item.');
                            }
                        }, TIME_INTERVAL);
                    }
                );
            };

            self.deleteById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var storedPrivateRooms = JSON.parse($window.localStorage.privateRooms);
                            for (var i = 0; i < storedPrivateRooms.length; i++) {
                                if (storedPrivateRooms[i].id === itemId) {
                                    storedPrivateRooms.splice(i, 1);
                                }
                            }
                            $window.localStorage.privateRooms = JSON.stringify(storedPrivateRooms);
                            resolve(true);
                        } else {
                            console.log('Error. Can`t delete private room because of wrong function`s parameter - itemId.');
                        }
                    }, TIME_INTERVAL);
                });
            };

            self.deleteByIdFromUser = function (itemId, userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId && userId) {
                            userService.getById(userId).then(function (user) {
                                if (user) {
                                    for (var i = 0; i < user.privateRoomViewModels.length; i++) {
                                        if (user.privateRoomViewModels[i].id === itemId) {
                                            user.privateRoomViewModels.splice(i, 1);
                                        }
                                    }
                                    userService.update(user).then(function (isUserUpdated) {
                                        if (isUserUpdated) {
                                            resolve(true);
                                        }
                                    }, function () {
                                        console.log('Error. Can`t update user with deleted private room.');
                                    });
                                }
                            }, function () {
                                console.log('Error. Can`t get user to delete private room.');
                            });
                        } else {
                            console.log('Error. Can`t delete private room because of wrong function`s parameter - itemId.');
                            reject(false);
                        }
                    }, TIME_INTERVAL);
                });
            };

            self.getById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var privateRoom = {};
                            self.getAll().then(function (privateRooms) {
                                privateRoom = privateRooms.filter(function (item) {
                                    return item.id == itemId;
                                })[0];
                                if (privateRoom) {
                                    resolve(privateRoom);
                                } else {
                                    reject(privateRoom);
                                }
                            });
                        } else {
                            console.log('Error. Can`t get private room because of wrong function`s parameter - itemId.');
                        }
                    }, TIME_INTERVAL);
                });
            }
        }
    );
})();