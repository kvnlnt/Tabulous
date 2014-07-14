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



// STANDARD TUNING
// E4 ————- 1st———- 329.63Hz
// B3 ————- 2nd——— 246.94 Hz
// G3 ————- 3rd——— 196.00 Hz
// D3 ————- 4th——— 146.83 Hz
// A2 ————- 5th——— 110 Hz
// E2 ————- 6th——— 82.41 Hz