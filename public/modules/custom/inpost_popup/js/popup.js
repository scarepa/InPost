/**
 * @file
 * Contains JS popup logic.
 */
(function($, Drupal, drupalSettings) {
    'use strict';

    Drupal.behaviors.managePopup = {

        inited: false,

        popupStatus: 0,

        /**
         * Loading popup
         */
        load: function(successCallback) {
            // Loads json with modal settings
            $.getJSON('/popup/display', function(data) {
                if (data.popup) {
                    if (typeof successCallback === "function") {
                        successCallback(data);
                    }
                }
            });
        },

        /**
         * Disabling popup with jQuery.
         */
        hidePopup: function() {
            if (Drupal.behaviors.managePopup.popupStatus === 1) {
                $('#popup-background').fadeOut('slow');
                $('#popup-window').fadeOut('slow', function() {
                    $('#popup-content').empty().remove();
                });
                Drupal.behaviors.managePopup.popupStatus = 0;
            }
        },

        /**
         * Display popup.
         *
         * @param {string} body
         *   Message body.
         * @param image
         * @param image_mobile
         */
        displayPopup: function(body, image, image_mobile, image_url, image_mobile_url) {
            let mp = this;
            var content = "",
                imageHtml = "";

            //Is image?
            if (image_mobile && document.documentElement.clientWidth < 800) {
                imageHtml = (image_mobile_url ? '<a href="' + image_mobile_url + '">' : '') + '<img src="' + image_mobile + '" />' + (image_mobile_url ? '</a>' : '');
            } else if (image && document.documentElement.clientWidth >= 800) {
                imageHtml = (image_url ? '<a href="' + image_url + '">' : '') + '<img src="' + image + '" />' + (image_url ? '</a>' : '');
            }

            //How to display? depends on body
            if (body) {
                //If body is setted set image above (if is image)
                if (imageHtml) {
                    content = '<div id="popup-content" class="-with-image">' + imageHtml + '<br />' + body + '</div>';
                } else {
                    content = "<div id='popup-content'>" + body + "</div>";
                }
            } else {
                //If no body set mode only image (imageHtml might be empty)
                content = imageHtml;
            }

            if (!content) {
                console.log('No content.');
                return;
            }

            // Loading popup.
            $('body').append("<div id='popup-window'><a id='popup-close'>&times;</a>" + content + "</div><div id='popup-background'></div>");

            $('#popup-background').css({
                opacity: '0.7'
            });
            $('#popup-background').fadeIn('slow');
            $('#popup-window').fadeIn('slow');
            Drupal.behaviors.managePopup.popupStatus = 1;

            // Set cookie
            let timestamp = (+new Date());
            $.cookie('popup_displayed', timestamp, {
                popup_path: '/'
            });

            // Closing popup.
            // Click the x event!
            $('#popup-close').click(function() {
                mp.hidePopup();
            });
            // Click out event!
            $('#popup-background').click(function() {
                mp.hidePopup();
            });

            // Press Escape event!
            $(document).keypress(function(e) {
                if (e.keyCode === 27 && popupStatus === 1) {
                    mp.hidePopup();
                }
            });
        },

        /**
         * Check if current page match to specified pattern
         * @param visibility
         * @param pages_regex
         */
        routeMatch: function(visibility, pages_regex) {

            let regex = new RegExp(pages_regex.substr(1).slice(0, -1), 'g'),
                matches = window.location.pathname.match(regex) || [];
            console.log('Matches: ', visibility, pages_regex, matches);

            if (!visibility) {
                //All except matches
                if (matches.length > 0) {
                    return false;
                }
            } else {
                //Only matches
                if (matches.length === 0) {
                    return false;
                }
            }

            //Show
            return true;
        },

        /**
         * Atach InPost Popup module
         */
        attach: function() {
            //Only once
            if (Drupal.behaviors.managePopup.inited) {
                return;
            }

            this.load(function(data) {
                let popup_cookie = $.cookie('popup_displayed');
                let delay = data.popup.delay * 1000;
                let show_popup;

                if (!popup_cookie || data.popup.check_cookie === 0) {
                    show_popup = true;
                } else {
                    popup_cookie = parseInt(popup_cookie, 10);
                    show_popup = (+new Date()) < (popup_cookie + delay);
                }

                // Override
                if (!Drupal.behaviors.managePopup.routeMatch(data.popup.visibility, data.popup.visibility_pages_regex)) {
                    show_popup = false;
                }

                // Depends on cookie and settings - show or not?
                if (show_popup) {
                    setTimeout(function() {
                        // Get variables.
                        Drupal.behaviors.managePopup.displayPopup(data.popup.body, data.popup.image, data.popup.image_mobile, data.popup.image_url, data.popup.image_mobile_url);
                    }, delay);
                }
            });
            Drupal.behaviors.managePopup.inited = true;
        }
    };
})(jQuery, Drupal, drupalSettings);