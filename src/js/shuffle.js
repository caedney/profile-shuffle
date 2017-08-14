(function($) {
    'use strict';
    // Default Options
    var defaults = {
        shuffleAmount: 1,
        lightBox: false,
        lightBoxPosition: 'body',
        buttonClass: 'shuffle-link',
        buttonText: 'shuffle layout'
    };

    var sw = {};

    function shuffleList() {
        var uni_num = [],
            ran_num;

        $(sw.children).hide();

        while (uni_num.length < sw.settings.shuffleAmount) {
            ran_num = Math.floor(Math.random() * sw.children.length);
            if (sw.settings.shuffleAmount * 2 > sw.children.length) {
                return false;
            }
            if (uni_num.indexOf(ran_num) === -1) {
                if (sw.numbers === undefined || sw.numbers.indexOf(ran_num) === -1) {
                    uni_num.push(ran_num);
                    $(sw.children[ran_num]).show();
                }
            }
        }

        sw.numbers = uni_num;

    }

    function shuffleButton(el) {
        sw.shuffle = {};
        sw.shuffle.control = $('<button />', {
            'class': sw.settings.buttonClass,
            'html': sw.settings.buttonText
        });
        el.before(sw.shuffle.control);
        shuffleList();
        sw.shuffle.control.on('click', shuffleList);
    }

    function lightBoxSetup() {
        sw.lightBox = {};

        if (sw.lightBox.setup === undefined) {
            sw.lightBox.controls = {};
            sw.lightBox.controls.open = $('<button />', {
                'class': 'open',
                'html': 'Open'
            });
            var wrapperHTML = '<div class="js-shuffle-window"><button class="close">Close</button><div class="js-shuffle-content"></div></div>';

            sw.lightBox.wrapper = $('<div />', {
                'class': 'js-shuffle-lightbox',
                'html': wrapperHTML
            });

            sw.children.prepend(sw.lightBox.controls.open);

            $(sw.settings.lightBoxPosition).prepend(sw.lightBox.wrapper);
            sw.lightBox.wrapper.hide();

            sw.lightBox.setup = true;
        }

        $('.open').on('click', function(e) {
            var targetHTML = e.target.nextElementSibling.outerHTML;
            sw.lightBox.wrapper.show();
            sw.lightBox.wrapper.find('.js-shuffle-content').html(targetHTML);
            sw.lightBox.view = 'open';
        });

        $('.close').on('click', function() {
            sw.lightBox.wrapper.hide();
        });
    }

    function setup(el) {
        el.addClass('js-shuffle');
        sw.children = el.children();
        sw.children.addClass('js-shuffle-item');
        if (sw.settings.lightBox) {
            lightBoxSetup();
        }
        shuffleButton(el);
    }

    function init(el, options) {
        sw.settings = $.extend({}, defaults, options);
        setup(el);
    }

    $.fn.shuffle = function(options) {
        var _ = this;
        if (_.length > 0) {
            init(_, options);
        }
        return _;
    };

}(jQuery));
