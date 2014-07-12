Tabulous.prototype.printTab = function(){

	var div = $("<pre>");
	var chordNotes = Lazy(this.chord.notes()).map(function(note){ return note.name() + note.accidental(); });

	// body print
	$("body").append(div);
	div.append("<h2>Tab</h2>");
	Lazy(this.tab).each(function(string, s){
		div.append('<br/>');
		Lazy(string).each(function(fret, f){
			var noteName = string[f].name() + string[f].accidental();
			var inChord = chordNotes.contains(noteName);
			var note = true === inChord ? noteName : 'x';
			div.append(note + '	');
		});
		div.append("<br/>|	|	|	|	|	|");
	});

};

Tabulous.prototype.printBoard = function(){

	var div = $("<pre>");

	// body print
	$("body").append(div);
	div.append("<h2>Board</h2>");
	Lazy(this.board).each(function(string, s){
		Lazy(string).each(function(fret, f){
			div.append(string[f].toString() + '	');
		});
		div.append('<br/>|	|	|	|	|	|');
		div.append("<br/>");
	});

	// console
	Lazy(this.board).each(function(string, s){
		Lazy(string).each(function(fret, f){
			console.log("string-" + s, "fret-" + f, "note-" + string[f].toString(), "key-" + string[f].key(), "freq-" + string[f].fq());
		});
	});
	
	return null;

};