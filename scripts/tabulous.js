var Tabulous = function(options){

	// DEFAULT OPTIONS

	    var defaults       = {};
	    defaults.root      = 'C';
	    defaults.type      = '';
	    defaults.tuning    = ['e2','a2','d3','g3','b3','e4'];
	    defaults.frets     = 24;
	    defaults.span      = 5;
	    defaults.algorithm = 'KORDFU';

    // SETTINGS
    
    	this.settings = _.extend({}, defaults, options);

    // INIT

    	this.setUp();

};