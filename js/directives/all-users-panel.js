(function () {
    "use strict";
    angular.module('chatApp').directive("allUsersPanel", function () {
        return {
            link: function (scope, element, attrs) {},
            restrict: "AE",
            templateUrl: "../views/templates/allUsersPanel.html"
        }
    });
})();