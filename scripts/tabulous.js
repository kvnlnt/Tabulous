var Tabulous = function(options){


	// CONFIGS & ENUMS
	this.TUNING = {

		GUITAR:{
			STANDARD:['e2','a2','d3','g3','b3','e4']
		}

	};

	// DEFAULT OPTIONS

	    var defaults    = {};
	    defaults.root   = 'a';
	    defaults.type   = '';
	    defaults.tuning = this.TUNING.GUITAR.STANDARD;
	    defaults.frets  = 24;
	    defaults.span   = 5;

    // SETTINGS
    
    	this.settings = Lazy({}).assign(options).defaults(defaults).value();

    // INIT

    	this.setUp();

};