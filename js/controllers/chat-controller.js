(function () {
    "use strict";
    angular.module('chatApp').controller("chatController", function ($scope, $routeParams, $location, userService, dataShareService) {
            $scope.currentUserName = null;
            $scope.allUsers = [];

            $scope.$on("$routeChangeSuccess", function () {
            if (dataShareService.getCurrentUserId() !== 'undefined') {
                var promiseGetAllUsers = userService.getAll();
                promiseGetAllUsers.then(function (users) {
                    $scope.allUsers = users;
                }, function () {
                    $location.path('/authorize');
                });
            } else {
                $location.path('/authorize');
            }
            });

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

/*
 phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
 function($scope, $routeParams) {
 $scope.phoneId = $routeParams.phoneId;
 }]);*/
/* <div ng-switch on="page">
 <div ng-switch-when="authorize">
 <div ng-switch-default>
 <p ng-if="data.visible">Первый блок</p>

 <p ng-if="!data.visible">Второй блок</p>


 for search
 <form class="input-group" name="searchForm">
 <input type="text" class="form-control" ng-model="searchName" required
 on-enter="searchPublicRoom(searchName)" placeholder="Input name of public room here ...">
 <span class="input-group-btn">
 <button class="btn btn-primary" type="submit" ng-click="searchPublicRoom(searchName, searchForm)">
 Search
 </button>
 </span>

 <div class="answers">
 <div ng-repeat="publicRoom in allPublicRooms | filter:{name:searchName}" class="answer">
 условие типа if array.length > 0 и тогда выводить блок с ng-repeat ?
 это обычно делается через директиву ng-hide:
 <table
 "="" ng-hide="array.length==0">
 при нажатии клавиши поиск загружаются allPublicrooms


 module.filter('filter_name', function(){
 return function(param){
 // некоторые действия над param
 return some_value;
 }
 })для вывода имени комнаты?

 директива для отобр-я allPublicrooms
 questApp.directive("answerList", function () {
 return function (scope, element, attrs) {
 var data = scope[attrs["answerList"]];
 if (angular.isArray(data.answers)) {
 var ulElem = angular.element("
 <ul>");
 element.append(ulElem);
 for (var i = 0; i < data.answers.length; i++) {
 var liElem = angular.element('
 <li>');
 liElem.append(angular.element('<p>').text(data.answers[i].text));
 ulElem.append(liElem);
 }
 }
 }
 });

 $rootScope.$broadcast("addDepartment", newDepartment);

 $scope.$on('addDepartment', function (event, department) {
 $scope.tournament.Departments.push(department);
 });
 </div>*/
