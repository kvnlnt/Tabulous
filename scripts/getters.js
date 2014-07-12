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

Tabulous.prototype.getTab = function(){

	var frets   = Lazy.range(0, this.settings.frets);
	var strings = this.tuning;
	var tab     = [];

	Lazy(frets).each(function(fret){
		tab[fret] = [];
		strings.each(function(string, s){ 
			var note = teoria.note.fromKey(string.key() + fret);
			tab[fret][s] = note;
		});
	});

	return tab;

};
