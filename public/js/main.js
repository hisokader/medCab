require.config({
    baseUrl : './',

    paths : {
        'jquery' : 'bower_components/jquery/dist/jquery',
        'underscore' : 'bower_components/underscore/underscore',
        'backbone' : 'bower_components/backbone/backbone',
        'text' : 'bower_components/text/text',
        'doT' : 'bower_components/doT/doT',
        'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap',
        'initscript' : 'js/scripts',
        'dcjqaccordion': 'bower_components/jquery-dcjqaccordion/jquery.dcjqaccordion',
        'scrollTo' : 'bower_components/jquery.scrollTo/jquery.scrollTo',
        'slimscroll' : 'bower_components/jquery.slimscroll/jquery.slimscroll',
        'nicescroll' : 'bower_components/jquery.nicescroll/jquery.nicescroll',
        'sparkline' : 'bower_components/jquery.sparkline/dist/jquery.sparkline',
        'flot' : 'bower_components/flot.tooltip/js/jquery.flot',
        'flot-tooltip' : 'bower_components/flot.tooltip/js/jquery.flot.tooltip',
        'flot-pie' : 'bower_components/flot/jquery.flot.pie',
        'flot-resize' : 'bower_components/flot/jquery.flot.resize',
        'easypiechart' : 'bower_components/easypie/dist/easypiechart',
        'router' : 'js/router',

        'templates':'./templates'
    },
    shim : {
        'backbone' : {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps : ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            //exports : 'Backbone'
        },
        'underscore' : {
           // exports : '_'
        },
        'bootstrap' : {
            deps : ['jquery']
        },
        'initscript' : {
            deps : ['jquery','bootstrap']
        },
        'dcjqaccordion' : {
            deps : ['jquery']
        },
        'scrollTo' : {
            deps : ['jquery']
        },
        'slimscroll' : {
            deps : ['jquery']
        },
        'nicescroll' : {
            deps : ['jquery']
        },
        'sparkline' : {
            deps : ['jquery']
        },
        'flot' : {
            deps : ['jquery']
        },
        'flot-tooltip' : {
            deps : ['flot']
        },
        'flot-pie' : {
            deps : ['flot']
        },
        'flot-resize' : {
            deps : ['flot']
        },
        'easypiechart' : {
            deps : ['jquery']
        }
    }
});
// Start the main app logic.
define([
    'jquery',
    'backbone',
    'router',
    'bootstrap',
    'initscript',
    'dcjqaccordion',
    'scrollTo',
    'slimscroll',
    'nicescroll',
    'sparkline',
    'flot-tooltip',
    'flot-pie',
    'flot-resize',
    'easypiechart'
],
    function ($,Backbone,Router) {

        new Router();
        Backbone.history.start({root: "/"});
});