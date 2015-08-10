(function () {
    "use strict";
    angular.module('chatApp').service("userService", function ($q, $window) {
            var TimeInterval = 0;//1000;
            var self = this;

            self.getAll = function () {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(JSON.parse($window.localStorage.users));
                    }, TimeInterval);
                });
            };

            self.authorize = function (username, password) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        var promiseGetAllUsers = self.getAll();
                        var user = {};
                        promiseGetAllUsers.then(function (users) {
                            user = users.filter(function (item) {
                                return item.name == username && item.password == password;
                            })[0];
                            if (user) {
                                resolve(user.id);
                            } else {
                                reject(user);
                            }
                        });
                    }, TimeInterval);
                });
            };

            self.create = function (item) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (item) {
                            item.id = JSON.parse($window.localStorage.users).length + 1;
                            var storedUsers = JSON.parse($window.localStorage.users);
                            storedUsers.push(item);
                            $window.localStorage.users = JSON.stringify(storedUsers);
                            resolve(item.id);
                        } else {
                            console.log('Error. Can`t create user because of wrong function`s parameter - item.');
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
                                    var storedUsers = JSON.parse($window.localStorage.users);
                                    storedUsers.push(item);
                                    $window.localStorage.users = JSON.stringify(storedUsers);
                                    resolve(true);
                                } else {
                                    reject(false);
                                }
                            });
                        } else {
                            console.log('Error. Can`t update user because of wrong function`s parameter - item.');
                        }
                    }, TimeInterval);
                });
            };

            self.deleteById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var storedUsers = JSON.parse($window.localStorage.users);
                            for (var i = 0; i < storedUsers.length; i++) {
                                if (storedUsers[i].id === itemId) {
                                    storedUsers.splice(i, 1);
                                }
                            }
                            $window.localStorage.users = JSON.stringify(storedUsers);
                            resolve(true);
                        } else {
                            console.log('Error. Can`t delete user because of wrong function`s parameter - itemId.');
                        }
                    }, TimeInterval);
                });
            };

            self.getById = function (itemId) {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (itemId) {
                            var promiseGetAllUsers = self.getAll();
                            var user = {};
                            promiseGetAllUsers.then(function (users) {
                                user = users.filter(function (item) {
                                    return item.id == itemId;
                                })[0];
                                if (user) {
                                    resolve(user);
                                } else {
                                    reject(user);
                                }
                            });
                        } else {
                            console.log('Error. Can`t get user because of wrong function`s parameter - itemId.');
                        }
                    }, TimeInterval);
                });
            };
        }
    );
})();