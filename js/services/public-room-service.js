(function () {
    "use strict";
    angular.module('chatApp').service("publicRoomService", function ($q, $window, userService) {
            var TimeInterval = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.publicRooms));
                    }, TimeInterval);
                });
            };

            self.getAllInViewModelsFormatByUserId = function (userId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        var promiseGetUserById = userService.getById(userId);
                        promiseGetUserById.then(function (user) {
                            if (user) {
                                resolve(user.publicRoomViewModels);
                            }
                        }, function () {
                            console.log('Error. Can`t get public rooms list.');
                        });
                    }, TimeInterval);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = JSON.parse($window.localStorage.publicRooms).length + 1;
                            var storedPublicRooms = JSON.parse($window.localStorage.publicRooms);
                            storedPublicRooms.push(item);
                            $window.localStorage.publicRooms = JSON.stringify(storedPublicRooms);
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create public room because of wrong function`s parameter - item.');
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
                        }, TimeInterval);
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
                                    for (var i = 0; i < user.publicRoomViewModels.length; i++) {
                                        if (user.publicRoomViewModels[i].id === itemId) {
                                            user.publicRoomViewModels.splice(i, 1);
                                        }
                                    }
                                    var promiseUpdateUserById = userService.update(user);
                                    promiseUpdateUserById.then(function (isUserUpdated) {
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
                    }, TimeInterval);
                });
            };

            self.getById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var promiseGetAllPublicRooms = self.getAll();
                            var publicRoom = {};
                            promiseGetAllPublicRooms.then(function (publicRooms) {
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
                    }, TimeInterval);
                });
            }
        }
    );
})();