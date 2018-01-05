/*
 * spa.data.js
 * Data module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, io, spa */

spa.data = (function () {
    'use strict';
    var
        stateMap = { sio: null },
        doit, initModule;


    doit = function () {

        console.log("doing-it");

        // Using the core $.ajax() method
        $.ajax({

            contentType: "application/json",
            // The URL for the request
            url: "https://l1n06zudrd.execute-api.us-west-1.amazonaws.com/prod/DynamoDBManager",

            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                "operation": "read",
                "tableName": "LambdaTable",
                "payload": {
                    "Key": {
                        "Id": "1",
                        "Name": "Bob"
                    }
                }
            }),

            // Whether this is a POST or GET request
            type: "POST",

            // The type of data we expect back
            dataType: "json",
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (json) {
                console.log(json);
                // $("<h1>").text(json.title).appendTo("body");
                // $("<div class=\"content\">").html(json.html).appendTo("body");
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                alert("The request is complete!");
            });


    }

    initModule = function () {
        console.log('spa.data initting...')
     };

    return {
        initModule: initModule,
        doit: doit
    };
}());
