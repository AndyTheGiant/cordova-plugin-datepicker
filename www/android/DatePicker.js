/**
 * Phonegap DatePicker Plugin Copyright (c) Greg Allen 2011 MIT Licensed
 * Reused and ported to Android plugin by Daniel van 't Oever
 * Callback fix and Cordova/Phonegap 3.5 optimization by Andy Lindemann
 */

var exec = require('cordova/exec');

module.exports = {
    show: function (options, successCB, errorCB) {
        options = options || {};

        if (!options.date || typeof options.date.getDate === 'undefined') {
            options.date = new Date();
        }

        var d = options.date;
        options.date = [d.getMonth() + 1, d.getDate(), d.getFullYear(), d.getHours(), d.getMinutes()].join('/');


        var defaults = {
            mode: 'date',
            date: '',
            minDate: 0,
            maxDate: 0,
            okButtonLabel: 'Done',
            cancelButtonLabel: 'Cancel',
            modalLabel: 'Set time'
        };

        for (var key in defaults) {
            if (defaults.hasOwnProperty(key) && typeof options[key] !== 'undefined') {
                defaults[key] = options[key];
            }
        }

        function cb(res) {
            if (res === 'cancel') {
               errorCB && errorCB(res);
            } else {
                successCB(new Date(res));
            }
        }

        exec(cb, errorCB, 'DatePickerPlugin', defaults.mode, [defaults]);
    }
};