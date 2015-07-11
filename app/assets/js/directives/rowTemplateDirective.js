/**
 * Created by Ivana on 17.5.2015..
 */
define(['components/dashboard/home/homeModule'], function(homeModule){
    "use strict";

    return homeModule.directive('dropdownRightClick', function() {

        /**
         * Display a dropdown box on rightClick
         * @param $scope
         * @param $element
         */
        var link = function($scope,$element){
            var ajax_dropdown = null;

            $element.on("contextmenu", function(event){

                event.preventDefault();

                ajax_dropdown = $(this).children('#ajax-dropdown');

                if (!ajax_dropdown.is(':visible')) {

                    ajax_dropdown.fadeIn(150);
                    ajax_dropdown.css({
                        left: event.pageX - 280,
                        top: event.pageY - 200
                    });
                }
                else {

                    ajax_dropdown.fadeOut(150);
                }
            })

            $(document).mousedown(function(e) {
                if (ajax_dropdown && ajax_dropdown.is(':visible')) {
                    ajax_dropdown.fadeOut(150);
                    $element.removeClass('active');
                }
            });
        }

        return{
            restrict:'EA',
            link:link
        }
    })
});