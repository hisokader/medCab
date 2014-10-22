require.config({
    baseUrl : '.',

    paths : {
        'jquery' : 'bower_components/jquery/dist/jquery',
        'underscore' : 'bower_components/underscore/underscore',
        'backbone' : 'bower_components/backbone/backbone',
        'text' : 'bower_components/text/text',
        'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap',
        'io' : 'bower_components/socket.io-client/socket.io',
        'initscript' : 'js/scripts',
        'dcjqaccordion': 'bower_components/jquery-dcjqaccordion/jquery.dcjqaccordion',
        'panelslideinit' : 'js/views/init/panelslide-init',
        'scrollTo' : 'bower_components/jquery.scrollTo/jquery.scrollTo',
        'slimscroll' : 'bower_components/jquery.slimscroll/jquery.slimscroll',
        'slimscrollinit' : 'js/views/init/slimscroll-init',
        'nicescroll' : 'bower_components/jquery.nicescroll/jquery.nicescroll',
        'sparkline' : 'bower_components/jquery.sparkline/dist/jquery.sparkline',
        'flot' : 'bower_components/flot.tooltip/js/jquery.flot',
        'flot-tooltip' : 'bower_components/flot.tooltip/js/jquery.flot.tooltip',
        'flot-pie' : 'bower_components/flot/jquery.flot.pie',
        'flot-resize' : 'bower_components/flot/jquery.flot.resize',
        'easypiechart' : 'bower_components/easypie/dist/easypiechart',
        'datatables' : 'js/js_other/datatables/jquery.dataTables',
        'DT_bootstrap':'js/js_other/datatables/DT_bootstrap',
        'bootstrap-datepicker':'bower_components/bootstrap-datepicker-eyecon/js/bootstrap-datepicker',
        'steps' : 'bower_components/jquery.steps/build/jquery.steps',
        'stepsinit' : 'js/views/init/steps-init',
        'validation' : 'bower_components/jquery-validate/dist/jquery.validate',
        'tagsinput':'bower_components/jquery.tagsinput/jquery.tagsinput',
        'fullcalendar':'bower_components/fullcalendar/dist/fullcalendar',
        'fullcalendarlangFr':'bower_components/fullcalendar/dist/lang/fr',
        'jqueryui':'bower_components/jquery-ui/jquery-ui',
        'bootstrap-timepicker':'js/js_other/bootstrap-timepicker/bootstrap-timepicker',
        'moment':'bower_components/moment/moment',
        'select2':'bower_components/select2/select2',
        'select2langFr':'bower_components/select2/select2_locale_fr',
        'inputmask' : 'bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask',
        'router' : 'js/router',
        'templates':'./templates'
    },
    shim : {
        'backbone' : {
            deps : ['underscore', 'jquery']
        },
        'underscore' : {
           // exports : '_'
        },
        'bootstrap' : {
            deps : ['jquery']
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
        'easypiechart' : {
            deps : ['jquery']
        },
        'sparkline' : {
            deps : ['jquery']
        },
        'flot' : {
            deps : ['jquery']
        },
        'flot-tooltip' : {
            deps : ['flot','jquery']
        },
        'flot-resize' : {
            deps : ['flot','jquery']
        },
        'flot-pie' : {
            deps : ['flot','jquery']
        },
        'datatables' : {
            deps : ['jquery']
        },
        'DT_bootstrap' : {
            deps : ['datatables','bootstrap']
        },
        'initscript' : {
            deps : ['jquery','bootstrap']
        },
        'bootstrap-datepicker' : {
            deps : ['jquery','bootstrap']
        },
        'steps' : {
            deps : ['jquery']
        },
        'stepsinit' : {
            deps : ['steps']
        },
        'validation' : {
            deps : ['jquery']
        },
        'moment' : {
            deps : ['jquery']
        },
        'inputmask' : {
            deps : ['jquery']
        },
        'tagsinput' : {
            deps : ['jquery']
        },
        'fullcalendar': {
            deps : ['jquery','moment','jqueryui']
        },
        'fullcalendarlangFr': {
            deps : ['fullcalendar']
        },
        'jqueryui': {
            deps : ['jquery']
        },
        'bootstrap-timepicker': {
            deps : ['bootstrap']
        },
        'select2':{
            deps:['jquery']
        },
        'select2langFr':{
            deps:['select2']
        }

    }
});
require([
    'dcjqaccordion',
    'scrollTo',
    'slimscroll',
    'nicescroll',
    'easypiechart',
    'sparkline',
    'flot',
    'flot-tooltip',
    'flot-resize',
    'flot-pie',
    'datatables',
    'DT_bootstrap',
    'steps',
    'validation',
    'bootstrap-datepicker',
    'moment',
    'inputmask',
    'tagsinput',
    'fullcalendarlangFr',
    'select2langFr',
    'bootstrap-timepicker',
    'js/main'
     ]);
// Start the main app logic.