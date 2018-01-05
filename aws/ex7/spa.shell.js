/*
* spa.schell.js
* Shell module for SPA
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */

spa.shell = (function () {
    var
        configMap = {
            main_html: String()
            + '    <div id="navbar">'
            + '        <a href="#home">Home</a>'
            + '        <a href="#about">About</a>'
            + '        <a href="#contact">Contact</a>'
            + '        <a href="#login">Login</a>'
            + '        <a href="#driver">Driver</a>'
            + '        <a href="#vehicle">Vehicle</a>'
            + '        <a href="#map">Map</a>'
            + '    </div>'
            + '    <div id="content"></div>'

        },
        stateMap = { $container: null },
        jqueryMap = {},
        isFakeData = false,
        initModule;



    initModule = function ($container) {
        console.log("initing...");
        console.log(location.hash);
        window.addEventListener("hashchange", function () { navigate() });
        if (!location.hash) {
            console.log("location is null setting to #home");
            location.hash = "#home";
        }
        navigate();
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
            + '    <button type="submit" class="btn btn-default btn-success">Submit</button>'
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


    return {
        initModule: initModule
    };
}());