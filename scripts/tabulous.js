var Tabulous = function(options){

	// DEFAULTS

	    var defaults    = {};
	    defaults.root   = 'C';
	    defaults.type   = 'Major';
	    defaults.tuning = ['E','A','D','G','B','E'];
	    defaults.frets  = 24;

    // SETTINGS
    
    	this.settings = Lazy({}).assign(options).defaults(defaults).value();

};