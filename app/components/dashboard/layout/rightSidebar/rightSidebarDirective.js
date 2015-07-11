/**
 * Created by Ivana on 18.5.2015..
 */
define(['appModule'], function (module) {
    "use strict";

    module.registerDirective('minifyRightMenu', function(){

        /**
         * Minifies the right sidebar
         */
        return {
            restrict: 'A',
            link: function(scope, element){
                var $body = $('body');
                var minifyRightMenu = function() {
                    if (!$body.hasClass("menu-on-top")) {
                        $body.toggleClass("minifiedRight");
                    }
                };
                element.on('click', minifyRightMenu);
            }
        }
    })

});
