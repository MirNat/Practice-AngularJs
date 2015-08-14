(function () {
    "use strict";
    angular.module('chatApp').directive("messagesPanel", function () {
        return {
            restrict: "AE",
            templateUrl: "../views/templates/messagesPanel.html"
        }
    });
})();