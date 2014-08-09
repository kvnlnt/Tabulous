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

};;Tabulous.prototype.getTuning = function(){

	var getNote = function(note){ return teoria.note(note); };
	var tuning  = _.map(this.settings.tuning, getNote);

	return tuning;

};

Tabulous.prototype.getBoard = function(){

	var strings = this.tuning;
	var board   = [];

	_.times(this.settings.frets, function(fret){
		board[fret] = [];
		_.each(strings, function(string, s){ 
			var note = teoria.note.fromKey(string.key() + fret);
			board[fret][s] = note;
		});
	});

	return board;

};

Tabulous.prototype.getChord = function(){

	var chord = teoria.chord(this.settings.root+this.settings.type);
	return chord;

};

Tabulous.prototype.getNotes = function(chord){

	// var notes = _.map(this.chord.notes(), function(note){ return note; });
	var notes = this.chord.notes();
	return notes;

};

Tabulous.prototype.getVoicings = function(startingFret, voicings){

	var population = this.calcPopulation();

	switch(this.settings.algorithm) {
		case 'KORDFU':
			return this.filterKORDFU(population);
			break;
	};

};

;Tabulous.prototype.setUp = function(){

	this.tuning   = this.getTuning();
	this.board    = this.getBoard();
	this.chord    = this.getChord();
	this.notes    = this.getNotes();
	this.voicings = this.getVoicings(0);

};

Tabulous.prototype.set = function(param, value){

	this.settings[param] = value;
	this.setUp();

};;Tabulous.prototype.calcPopulation = function(startingFret, voicings){

	var voicings       = voicings || [];
	var startingFret   = startingFret || 0;
	var frettedStrings = []; // add strings as they are fretted
	var frets          = _.range(startingFret, startingFret + this.settings.span);
	var strings        = this.tuning;
	var chordNotes     = _.map(this.notes, function(note){ return note.name() + note.accidental(); });
	var tab            = _.map(strings, function(){ return -1 }); // prepopulated tab array of none found
	var data           = _.map(strings, function(){ return null });
	
	// loop frets
	_.each(frets, function(fret, fretsTraversed){

		// loop strings
		_.each(strings, function(string, stringNumber){

			var note          = teoria.note.fromKey(string.key() + fret);
			var enharmName 	  = note.enharmonics(true).length ? note.enharmonics(true)[0].name() + note.enharmonics(true)[0].accidental() : '';
			var noteName      = note.name() + note.accidental();
			var isChordNote   = _.contains(chordNotes, noteName) || _.contains(chordNotes, enharmName);
			var isFretted     = _.contains(frettedStrings, stringNumber);
			var lastFretFound = true === isFretted ? fret : lastFretFound;

			if(true === isChordNote && false === isFretted){
				frettedStrings.push(stringNumber);
				tab[stringNumber]  = fret;
				data[stringNumber] = note;
			}

		});

	});

	// get last fret used and determine if to continue
	// var prevLastFret = Lazy(Lazy(voicings).last()).compact().sortBy().last(); // get last fret of prev tab
	var prevLastFret = voicings.length > 0 ? _.chain(_.last(voicings).voicing).compact().sortBy().last().value() : 0;
	var lastFret     = _.chain(tab).compact().sortBy().last().value() // get current last fret
	var startFret    = startingFret + 1; // if we just passed the 12th fret, reset algo starting fret
	var cont         = (startingFret + this.settings.span) < this.settings.frets; // continue if we have more frets to walk

	// add tab
	voicings.push({ voicing:tab, data:data });

	var noDupVoicings                = this.filterDupVoicings(voicings);
	var labeledInvertedNotesVoicings = this.filterInversions(noDupVoicings);

	return true === cont ? this.calcPopulation(startFret, voicings) : labeledInvertedNotesVoicings;

};;Tabulous.prototype.filterDupVoicings = function(voicings){
	
	var uniqs = [];
	var uniq_voicings = [];

	_.each(voicings, function(voicing){
		var found = void 0 === _.find(uniqs,voicing.voicing);
		if(found){ 
			uniqs.push(voicing.voicing);
			uniq_voicings.push(voicing);
		}
	});

	return uniq_voicings;

};

Tabulous.prototype.filterInversions = function(voicings){

	var that      = this;
	var foundRoot = false;
	var root      = that.settings.root.toLowerCase();

	_.each(voicings, function(voicing){
		_.each(voicing.data, function(note){

			var curr_note = note.toString(true);
			if(root === curr_note){ foundRoot = true; }
			if(!foundRoot){ 
				note.inverted = true; 
			} else {
				note.inverted = false;
			}

		});
	});

	return voicings;

};

Tabulous.prototype.filterKORDFU = function(population){

	var filter = [];

	// loop all voicings
	_.each(population, function(voicing, i){

		var fingersUsed           = 0;
		var fretsCounted          = [];
		var hasOpenOrMutedStrings = _.contains(voicing.voicing, 0) || _.contains(voicing.voicing, 1);
		var voicingsFretted 	  = _.filter(voicing.voicing,function(v){ return v > 0 });
		var firstFret             = voicingsFretted.sort()[0];

		// loop frets
		_.each(voicing.voicing, function(fret, j){
			
			var isFretted 				= !_.contains([0,-1],fret);
			var numStringsFretted     	= _.filter(voicingsFretted, function(v){ return v === fret }).length;
			var fretCounted 			= _.contains(fretsCounted, fret);

			// finger counting logic
			if(!fretCounted){
				if(!hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += 1; }
				if(hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += numStringsFretted }
				if(firstFret !== fret){ fingersUsed += numStringsFretted }
			}
			
			fretsCounted.push(fret);


		});

		if(fingersUsed <= 5) { 
			filter.push(voicing);
			// console.log(voicing.voicing, "fingersUsed=", fingersUsed, hasOpenOrMutedStrings);
		}
		

	});

	return filter;

};