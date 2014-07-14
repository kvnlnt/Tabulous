Tabulous.prototype.printBoard = function(){

	var div = $("<pre>");

	// body print
	$("body").append(div);
	div.append("<h2>Board</h2>");

	Lazy(this.board).each(function(string, s){
		Lazy(string).each(function(fret, f){
			var enharm = string[f].enharmonics(true).length ? '/' + string[f].enharmonics(true).toString() : '';
			div.append(string[f].toString() + enharm + '		');
		});
		div.append("<br/>");
	});

	// console
	Lazy(this.board).each(function(string, s){
		Lazy(string).each(function(fret, f){

			var enharm = string[f].enharmonics(true).length ? string[f].enharmonics(true).toString() : 'x';

			console.log(
				"string-" + s, 
				"fret-" + f, 
				"note-" + string[f].toString(), 
				"enharm-" + enharm,
				"key-" + string[f].key(), 
				"freq-" + string[f].fq());
		});
	});
	
	return null;

};

Tabulous.prototype.printBoardChordNotes = function(){

	var div        = $("<pre>");
	var chordNotes = Lazy(this.notes.toArray()).map(function(note){ return note.name() + note.accidental(); }).toArray();

	// body print
	$("body").append(div);
	div.append("<h2>Tab</h2>");
	Lazy(this.board).each(function(string, s){
		div.append('<br/>');
		Lazy(string).each(function(fret, f){
			var note     = string[f].name() + string[f].accidental();
			var enharm   = string[f].enharmonics(true).length ? string[f].enharmonics(true)[0].name() + string[f].enharmonics(true)[0].accidental() : '';
			var inChord  = Lazy(chordNotes).contains(note) || Lazy(chordNotes).contains(enharm);
			var notation = true === inChord ? note : 'x';
			div.append(notation + '		');
		});
		div.append("<br/>");
	});

};

