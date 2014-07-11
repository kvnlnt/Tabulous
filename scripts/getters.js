Tabulous.prototype.getTuning = function(){

	var getNote = function(note){ return teoria.note(note); };
	var tuning  = Lazy(this.settings.tuning).map(getNote);

	return tuning;

};

Tabulous.prototype.getBoard = function(){

	var that   = this;
	var tuning = this.tuning;

	// loop
	var board = Lazy(tuning)
				.map(function(note){ return that.getString(note); })
				.value()
				.reverse();

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

Tabulous.prototype.getTab = function(){

	var tab = {};
	var notes = teoria.chord(this.settings.root + this.settings.type).notes().toString();
	console.log(notes);

	return tab;

};
