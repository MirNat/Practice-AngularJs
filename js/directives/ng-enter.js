(function () {
    "use strict";
    angular.module('chatApp').directive('ngEnter', function () {
        return {
            link: function (scope, elements, attrs) {
                elements.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        };
    });
})();