/*
 * @Author: iceStone
 * @Date:   2015-07-23 21:17:30
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-07-23 21:51:00
 */

(function() {
    'use strict';
    Object.prototype.each = function(callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i]);
        }
    };

    var $ = function(selector) {
        return document.querySelector(selector);
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        // TODO: Callback
        var profile = JSON.parse(this.responseText);

        $('.page-head').innerHTML = profile.title;
        $('.page-sub-head').innerHTML = profile.subtitle;
        var root = $('.page');
        profile.sections.each(function(item) {
            var sectionHead = document.createElement('h2');
            sectionHead.setAttribute('class', 'panel-head');
            sectionHead.innerHTML = item.title;
            var sectionContent = document.createElement('div');
            sectionContent.setAttribute('class', 'panel-body');
            var contentList = document.createElement(item.container_type);
            contentList.setAttribute('class', item.container_class_name);
            item.content_list.each(function(subitem) {
                var listItem = document.createElement('li');
                listItem.innerHTML = subitem;
                contentList.appendChild(listItem);
            });
            sectionContent.appendChild(contentList);
            var section = document.createElement('section');
            section.setAttribute('class', 'panel');
            section.appendChild(sectionHead);
            section.appendChild(sectionContent);
            root.appendChild(section);
        });

        var panels = document.getElementsByClassName('panel');
        setInterval(function() {
            panels.each(function(item) {
                if (window.innerHeight - item.offsetTop + document.body.scrollTop > 0 && item.className != 'panel in') {
                    item.className += ' in';
                }
            });
        }, 500);
    };
    xhr.open('get', 'profile.json', true);
    xhr.send();
})();
