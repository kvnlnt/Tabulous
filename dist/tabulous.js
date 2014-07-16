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

	var chord = teoria.note(this.settings.root).chord(this.settings.type);
	return chord;

};

Tabulous.prototype.getNotes = function(chord){

	var notes = _.map(this.chord.notes(), function(note){ return note; });
	return notes;

};

Tabulous.prototype.getVoicings = function(startingFret, voicings){

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
	var startFret    = prevLastFret < 12 && lastFret > 12 ? 12 : lastFret; // if we just passed the 12th fret, reset algo starting fret
	var cont         = (startingFret + this.settings.span) < this.settings.frets; // continue if we have more frets to walk

	// add tab
	voicings.push({ voicing:tab, data:data });

	// console.log(tab, lastFret, cont);
	return true === cont ? this.getVoicings(startFret, voicings) : voicings;

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

};