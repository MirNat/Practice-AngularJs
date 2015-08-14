(function () {
    "use strict";
    angular.module('chatApp').service("publicRoomService", function ($q, $window, userService) {
            var TIME_INTERVAL = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.publicRooms));
                    }, TIME_INTERVAL);
                });
            };

            self.getAllInViewModelsFormatByUserId = function (userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        userService.getById(userId).then(function (user) {
                            if (user) {
                                resolve(user.publicRoomViewModels);
                            }
                        }, function () {
                            console.log('Error. Can`t get public rooms list.');
                        });
                    }, TIME_INTERVAL);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = ++JSON.parse($window.localStorage.publicRooms).length;
                            var storedPublicRooms = JSON.parse($window.localStorage.publicRooms);
                            storedPublicRooms.push(item);
                            $window.localStorage.publicRooms = JSON.stringify(storedPublicRooms);
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create public room because of wrong function`s parameter - item.');
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
                                        var storedPublicRooms = JSON.parse($window.localStorage.publicRooms);
                                        storedPublicRooms.push(item);
                                        $window.localStorage.publicRooms = JSON.stringify(storedPublicRooms);
                                        resolve(true);
                                    } else {
                                        reject(false);
                                    }
                                });
                            } else {
                                console.log('Error. Can`t update public room because of wrong function`s parameter - item.');
                            }
                        }, TIME_INTERVAL);
                    }
                );
            };

            self.deleteById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var storedPublicRooms = JSON.parse($window.localStorage.publicRooms);
                            for (var i = 0; i < storedPublicRooms.length; i++) {
                                if (storedPublicRooms[i].id === itemId) {
                                    storedPublicRooms.splice(i, 1);
                                }
                            }
                            $window.localStorage.publicRooms = JSON.stringify(storedPublicRooms);
                            resolve(true);
                        } else {
                            console.log('Error. Can`t delete public room because of wrong function`s parameter - itemId.');
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
                                    for (var i = 0; i < user.publicRoomViewModels.length; i++) {
                                        if (user.publicRoomViewModels[i].id === itemId) {
                                            user.publicRoomViewModels.splice(i, 1);
                                        }
                                    }
                                    userService.update(user).then(function (isUserUpdated) {
                                        if (isUserUpdated) {
                                            resolve(true);
                                        }
                                    }, function () {
                                        console.log('Error. Can`t update user with deleted public room.');
                                    });
                                }
                            }, function () {
                                console.log('Error. Can`t get user to delete public room.');
                            });
                        } else {
                            console.log('Error. Can`t delete public room because of wrong function`s parameter - itemId.');
                            reject(false);
                        }
                    }, TIME_INTERVAL);
                });
            };

            self.getById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var publicRoom = {};
                            self.getAll().then(function (publicRooms) {
                                publicRoom = publicRooms.filter(function (item) {
                                    return item.id == itemId;
                                })[0];
                                if (publicRoom) {
                                    resolve(publicRoom);
                                } else {
                                    reject(publicRoom);
                                }
                            });
                        } else {
                            console.log('Error. Can`t get public room because of wrong function`s parameter - itemId.');
                        }
                    }, TIME_INTERVAL);
                });
            }
        }
    );
})();