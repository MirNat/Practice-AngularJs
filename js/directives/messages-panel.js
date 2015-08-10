(function () {
    "use strict";
    angular.module('chatApp').directive("messagesPanel", function () {
        return {
            link: function (scope, element, attrs) {
            },
            restrict: "AE",
            templateUrl: "../views/templates/messagesPanel.html"
        }
    });
})();