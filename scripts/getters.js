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

	var notes = Lazy(this.chord.notes()).map(function(note){ return note.name() });
	return notes;

};

Tabulous.prototype.getTabs = function(startingFret, searchFretSpan){

	var searchFretSpan = searchFretSpan || 5;
	var startingFret   = startingFret || 0;
	var frettedStrings = []; // add strings as they are fretted
	var frets          = Lazy.range(startingFret, startingFret + searchFretSpan);
	var strings        = Lazy(this.tuning);
	var chordNotes     = Lazy(this.chord.notes()).map(function(note){ return note.name() + note.accidental(); });
	var tracer         = strings.map(function(){ return -1 }).toArray(); // prepopulated tab array of none found
	var lastFretFound  = null;
	
	// loop frets
	frets.each(function(fret, fretsTraversed){

		// loop strings
		strings.each(function(string, stringNumber){

			var note          = teoria.note.fromKey(string.key() + fret);
			var noteName      = note.name() + note.accidental();
			var isChordNote   = chordNotes.contains(noteName);
			var isFretted     = Lazy(frettedStrings).contains(stringNumber);
			var lastFretFound = true === isFretted ? fret : lastFretFound;

			if(true === isChordNote && false === isFretted){
				frettedStrings.push(stringNumber);
				tracer[stringNumber] = fret;
			}

			// console.log("fret-",fret, "trav-", fretsTraversed, "string-", string.toString(), "stringNum-", stringNumber);

		});

		// console.log(frettedStrings);

	});

	console.log(tracer);

	// return tabs;

};
