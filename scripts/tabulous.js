var Tabulous = function(options){


	// CONFIGS & ENUMS
	this.TUNING = {

		GUITAR:{
			STANDARD:['e2','a2','d3','g3','b3','e4']
		}, 

		MANDOLIN: {
			STANDARD:['g3','d4','a4','e5']
		}

	};

	this.ALGORITHM = {
		CAGED:'CAGED',
		EXHAUSTIVE:'EXHAUSTIVE'
	};

	// DEFAULT OPTIONS

	    var defaults       = {};
	    defaults.root      = 'C';
	    defaults.type      = 'maj11';
	    defaults.tuning    = this.TUNING.GUITAR.STANDARD;
	    defaults.frets     = 24;
	    defaults.span      = 5;
	    defaults.algorithm = this.ALGORITHM.CAGED;

    // SETTINGS
    
    	this.settings = _.extend({}, defaults, options);

    // INIT

    	this.setUp();

};