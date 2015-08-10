(function () {
    "use strict";
    angular.module('chatApp').service("privateRoomService", function ($q, $window, userService) {
            var TimeInterval = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.privateRooms));
                    }, TimeInterval);
                });
            };

            self.getAllInViewModelsFormatByUserId = function (userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        var promiseGetUserById = userService.getById(userId);
                        promiseGetUserById.then(function (user) {
                            if (user) {
                                resolve(user.privateRoomViewModels);
                            }
                        }, function () {
                            console.log('Error. Can`t get private rooms list.');
                        });
                    }, TimeInterval);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = JSON.parse($window.localStorage.privateRooms).length + 1;
                            var storedPrivateRooms = JSON.parse($window.localStorage.privateRooms);
                            storedPrivateRooms.push(item);
                            $window.localStorage.privateRooms = JSON.stringify(storedPrivateRooms);
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create private room because of wrong function`s parameter - item.');
                        }
                    }, TimeInterval);
                });
            };

            self.update = function (item) {
                return $q(function (resolve, reject) {
                        setTimeout(function () {
                            if (item) {
                                var promiseDeleteById = self.deleteById(item.id);
                                promiseDeleteById.then(function (resultOfDeletion) {
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
                        }, TimeInterval);
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
                    }, TimeInterval);
                });
            };

            self.deleteByIdFromUser = function (itemId, userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId && userId) {
                            var promiseGetUserById = userService.getById(userId);
                            promiseGetUserById.then(function (user) {
                                if (user) {
                                    for (var i = 0; i < user.privateRoomViewModels.length; i++) {
                                        if (user.privateRoomViewModels[i].id === itemId) {
                                            user.privateRoomViewModels.splice(i, 1);
                                        }
                                    }
                                    var promiseUpdateUserById = userService.update(user);
                                    promiseUpdateUserById.then(function (isUserUpdated) {
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
                    }, TimeInterval);
                });
            };

            self.getById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var promiseGetAllPrivateRooms = self.getAll();
                            var privateRoom = {};
                            promiseGetAllPrivateRooms.then(function (privateRooms) {
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
                    }, TimeInterval);
                });
            }
        }
    );
})();