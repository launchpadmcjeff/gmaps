/*
* spa.vehicle.js
* Vehicle module for SPA
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */

spa.vehicle = (function () {
    var
        configMap = {
            main_html: String()
            + '<div id="driver-content" class="container">'
            + '    <h2>Register Driver</h2>'
            + '    <hr>'
            + '  <form class="form-horizontal">'
            + '    <div class="form-group">'
            + '        <label for="fieldName">Name:</label>'
            + '        <input class="form-control" id="fieldName" type="text">'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="fieldEmail">Email address:</label>'
            + '        <input class="form-control" id="fieldEmail" type="email">'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="pwd">Password:</label>'
            + '        <input class="form-control" id="pwd" type="password">'
            + '    </div>'
            + '    <div class="checkbox">'
            + '        <label><input type="checkbox">Can see</label>'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="comment">Comment:</label>'
            + '        <textarea class="form-control" rows="5" id="comment"></textarea>'
            + '    </div>'
            + '    <button type="submit" class="btn btn-default btn-success">Submit</button>'
            + '  </form>'
            + '</div>'
        },
        stateMap = { $container: null },
        jqueryMap = {},
        isFakeData = false,
        initModule;



    initModule = function ($container) {
        console.log("...initModule..." + location.hash);
        $container.html(configMap.main_html);
        stateMap.$container = $container;
        setJqueryMap();
        return true;
    }

    function getContentXmlRpc(fragmentId, callback) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            callback(request.responseText);
        }

        request.open("GET", fragmentId + ".html");
        request.send(null);

    }

    function getContent(fragmentId, callback) {
        var partials = {
            home: "Welcome to the site",
            about: "This is the about page",
            contact: "This is the contact page",
            driver: String()
            + '<div id="driver-content" class="container">'
            + '    <h2>Register Driver</h2>'
            + '    <hr>'
            + '  <form class="form-horizontal">'
            + '    <div class="form-group">'
            + '        <label for="fieldName">Name:</label>'
            + '        <input class="form-control" id="fieldName" type="text">'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="fieldEmail">Email address:</label>'
            + '        <input class="form-control" id="fieldEmail" type="email">'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="pwd">Password:</label>'
            + '        <input class="form-control" id="pwd" type="password">'
            + '    </div>'
            + '    <div class="checkbox">'
            + '        <label><input type="checkbox">Can see</label>'
            + '    </div>'
            + '    <div class="form-group">'
            + '        <label for="comment">Comment:</label>'
            + '        <textarea class="form-control" rows="5" id="comment"></textarea>'
            + '    </div>'
            + '    <button type="submit" class="btn btn-default btn-warning">Submit</button>'
            + '  </form>'
            + '</div>'
        }
        callback(partials[fragmentId]);
    }

    function navigate() {

        var contentDiv = document.getElementById("content");

        fragmentId = location.hash.substring(1);

        // contentDiv.innerHTML = getContent(fragmentId);
        getContent(fragmentId, function (content) {
            contentDiv.innerHTML = content;
        });

        setActiveLink(fragmentId);
    }

    function setActiveLink(fragmentId) {
        var navbarDiv = document.getElementById("navbar"),
            links = navbarDiv.children,
            //links = document.querySelectorAll("#navbar a"),
            i, link, pageName;

        for (i = 0; i < links.length; i++) {
            link = links[i];
            pageName = link.getAttribute("href").substr(1);
            if (pageName == fragmentId) {
                link.setAttribute("class", "active");
            } else {
                link.removeAttribute("class");
            }
        }


    }
  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

    return {
        initModule: initModule,
        configModule: configModule
    };
}());