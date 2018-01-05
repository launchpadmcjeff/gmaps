/*
 * spa.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global TAFFY, $, spa */

spa.model = (function () {
    'use strict';
    var configMap = {},
        initModule;

    initModule = function () {
        console.log('spa.model initting..')
    }

    return { initModule: initModule };
}());
