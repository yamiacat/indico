/*
* -*- mode: text; coding: utf-8; -*-


   This file is part of Indico.
   Copyright (C) 2002 - 2014 European Organization for Nuclear Research (CERN).

   Indico is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License as
   published by the Free Software Foundation; either version 3 of the
   License, or (at your option) any later version.

   Indico is distributed in the hope that it will be useful, but
   WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Indico; if not, see <http://www.gnu.org/licenses/>.
*/

(function($) {
    $.widget("indico.clearableinput", {
        options: {
            onchange: function() {},
            callback: function() {},
            clearClass: 'clearableinput',
            emptyvalue: '',
            focusAfter: true
        },

        _create: function() {
            var self = this;
            var opt = self.options;
            var input = self.element;

            input.addClass('clearabletext');

            self.clearIcon = $('<span class="icon-close"></span>')
                .css("line-height", input.css("height"))
                .click(function() {
                    self._clear();
                });

            input.wrap($('<div class="' + opt.clearClass + '"></div>'))
                .on("input propertychange", function() {
                    opt.onchange();
                    if (input.val() === "") {
                        self.clearIcon.css("visibility", "hidden");
                    } else {
                        self.clearIcon.css("visibility", "visible");
                    }
                })
                .on("keyup", function(e) {
                    if (e.which == K.ESCAPE) {
                        input.val('value');
                        self._clear();
                    }
                });

            input.after(self.clearIcon);

            if (opt.focus) {
                input.focus();
            }
        },

        _clear: function() {
            var self = this;
            var opt = self.options;
            var input = self.element;

            input.val(opt.emptyvalue).trigger("propertychange");
            opt.callback();

            if (opt.focusAfter) {
                input.focus();
            } else {
                input.blur();
            }
        },

        initSize: function(fontSize, lineHeight) {
            var self = this;

            if (self.size === undefined) {
                self.size = {
                    fontSize: fontSize,
                    lineHeight: lineHeight
                };
            }

            self.clearIcon.css('font-size', self.size.fontSize);
            self.clearIcon.css('line-height', self.size.lineHeight);
        },

        setEmptyValue: function(value) {
            var self = this;

            self.options.emptyvalue = value;
        },

        setIconsVisibility: function(visibility) {
            var self = this;

            self.clearIcon.css('visibility', visibility);
        }
    });
})(jQuery);
