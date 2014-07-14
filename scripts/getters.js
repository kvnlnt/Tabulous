Tabulous.prototype.getTuning = function(){

	var getNote = function(note){ return teoria.note(note); };
	var tuning  = Lazy(this.settings.tuning).map(getNote);

	return tuning;

};

Tabulous.prototype.getBoard = function(){

	var frets   = Lazy.range(0, this.settings.frets);
	var strings = this.tuning;
	var board   = [];

	Lazy(frets).each(function(fret){
		board[fret] = [];
		strings.each(function(string, s){ 
			var note = teoria.note.fromKey(string.key() + fret);
			board[fret][s] = note;
		});
	});

	return board;

};

Tabulous.prototype.getString = function(note){

	var fretRange = Lazy.range(0, this.settings.frets);
	var string    = [note];
	
	Lazy(fretRange).each(function(fret, i){	
		string.push(teoria.note.fromKey(string[i].key() + 1));
	});

	return string;

};

Tabulous.prototype.getChord = function(){

	var chord = teoria.note(this.settings.root).chord(this.settings.type);
	return chord;

};

Tabulous.prototype.getNotes = function(chord){

	var notes = Lazy(this.chord.notes()).map(function(note){ return note; });
	return notes;

};

Tabulous.prototype.getVoicings = function(startingFret, voicings){

	var voicings       = voicings || [];
	var startingFret   = startingFret || 0;
	var frettedStrings = []; // add strings as they are fretted
	var frets          = Lazy.range(startingFret, startingFret + this.settings.span);
	var strings        = Lazy(this.tuning);
	var chordNotes     = Lazy(this.notes.toArray()).map(function(note){ return note.name() + note.accidental(); }).toArray();
	var tab            = strings.map(function(){ return -1 }).toArray(); // prepopulated tab array of none found
	var tabNotes       = [];
	
	// loop frets
	frets.each(function(fret, fretsTraversed){

		// loop strings
		strings.each(function(string, stringNumber){

			var note          = teoria.note.fromKey(string.key() + fret);
			var enharmName 	  = note.enharmonics(true).length ? note.enharmonics(true)[0].name() + note.enharmonics(true)[0].accidental() : '';
			var noteName      = note.name() + note.accidental();
			var isChordNote   = Lazy(chordNotes).contains(noteName) || Lazy(chordNotes).contains(enharmName);
			var isFretted     = Lazy(frettedStrings).contains(stringNumber);
			var lastFretFound = true === isFretted ? fret : lastFretFound;

			if(true === isChordNote && false === isFretted){
				frettedStrings.push(stringNumber);
				tab[stringNumber] = fret;
				tabNotes[stringNumber] = note;
			}

		});

	});

	// get last fret used and determine if to continue
	var prevLastFret = Lazy(Lazy(voicings).last()).compact().sortBy().last(); // get last fret of prev tab
	var lastFret     = Lazy(tab).compact().sortBy().last(); // get current last fret
	var startFret    = prevLastFret < 12 && lastFret > 12 ? 12 : lastFret; // if we just passed the 12th fret, reset algo starting fret
	var cont         = (startingFret + this.settings.span) < this.settings.frets; // continue if we have more frets to walk

	// add tab
	voicings.push({
		voicing:tab,
		notes:tabNotes
	});

	// console.log(tab, lastFret, cont);
	return true === cont ? this.getVoicings(startFret, voicings) : voicings;

};
