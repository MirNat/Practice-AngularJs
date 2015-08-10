(function () {
    "use strict";
    angular.module('chatApp').directive("roomPanel", function () {
        return {
            link: function (scope, element, attrs) {},
            restrict: "AE",
            templateUrl: "../views/templates/roomPanel.html"
        }
    });
})();