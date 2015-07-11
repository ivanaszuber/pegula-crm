define(['appModule'], function (appModule) {
    "use strict";

    return appModule.registerDirective('editInput', function () {

        /**
         * Creates a wrapper with an Edit link and icon which when clicked
         * enable the associated field
         */
        return {
            link: function (scope, element) {
                var enabled, i, wrapper, focused;
                enabled = true;
                focused = false;

                scope.$watch('editHover', function () {
                    return enabled = scope.editHover;
                });

                i = angular.element(' <a><i class="fa fa-pencil"></i><span>Edit</span></a>');
                i.css({
                    display: 'none',
                    fontSize: '16px',
                    right: '15px',
                    position: 'absolute',
                    top: '5px',
                    color: '#6D6A69',
                    'font-style': 'italic',
                    cursor: 'pointer'
                });
                wrapper = angular.element('<div class="edit-input-wrapper"></div>');
                wrapper.css({
                    width: '100%',
                    height: '100%',
                    marginTop: '10px',
                    display: 'none',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0
                });

                element.parent().addClass('edit-input');
                element.parent().removeClass('has-success');
                element.parent().css({
                    position: 'relative'
                });
                element.parent().append(i);
                element.parent().append(wrapper);
                element.parent().on('mouseover', function () {
                    if (enabled === false) {
                        return;
                    }
                    wrapper.css({
                        display: 'block'
                    });
                    i.css({
                        display: 'inline'
                    });

                    if(focused==false)
                    {
                        wrapper.parent().parent().css({
                            background: '#EEEEEE'
                        });
                        element.css({
                            background: '#EEEEEE'
                        })
                    }

                    i.on('click', function () {
                        focused = true;
                        element.removeAttr("disabled");
                        element.focus(function () {
                            $(this).select();
                        });
                        wrapper.parent().parent().css({
                            background: '#fff'
                        });
                        element.css({
                            background: '#fff'
                        })
                    });

                    element.on("focusout", function () {
                        element.attr("disabled", true);
                        focused = false;
                    })

                    return element.css({
                        opacity: 0.9
                    });
                });


                element.parent().on('mouseout', function () {
                    wrapper.css({
                        display: 'none'
                    });
                    i.css({
                        display: 'none'
                    });
                    wrapper.parent().parent().css({
                        background: '#fff'
                    });
                    element.css({
                        background: '#fff'
                    })
                    element.disabled = 'disabled'
                    return element.parent().css({
                        opacity: 1
                    });
                });


            }
        };
    })
        ;


})
;
