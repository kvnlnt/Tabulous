Tabulous.prototype.getTuning = function(){

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

Tabulous.prototype.getVoicings = function(){

	var population = this.calcAllPossibleVoicings();
	var nodups     = population = this.filterDupVoicings(population);
	var playable   = this.filterPlayableChords(nodups);
	var board      = this.board;

	// loop data
	// var data = _.map(playable, function(voicing){
	// 	return {
	// 		voicing:voicing
	// 	}
	// });

	// console.log(data);

	return playable;

};

