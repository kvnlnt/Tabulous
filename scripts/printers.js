Tabulous.prototype.printBoard = function(){

	var div = $("<pre>");

	// body print
	$("body").append(div);
	div.append("<h2>Board</h2>");

	_.each(this.board, function(string, s){
		_.each(string, function(fret, f){
			var enharm = string[f].enharmonics(true).length ? '/' + string[f].enharmonics(true).toString() : '';
			div.append(string[f].toString() + enharm + '		');
		});
		div.append("<br/>");
	});

	// console
	_.each(this.board, function(string, s){
		_.each(string, function(fret, f){

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
	var chordNotes = _.map(this.notes, function(note){ return note.name() + note.accidental(); });

	// body print
	$("body").append(div);
	div.append("<h2>Tab</h2>");
	_.each(this.board, function(string, s){
		div.append('<br/>');
		div.append(s + '	');
		_.each(string, function(fret, f){

			var note          = string[f];
			var enharmName 	  = note.enharmonics(true).length ? note.enharmonics(true)[0].name() + note.enharmonics(true)[0].accidental() : '';
			var noteName      = note.name() + note.accidental();
			var isChordNote   = _.contains(chordNotes, noteName) || _.contains(chordNotes, enharmName);
			var notation = true === isChordNote ? noteName + '/' + enharmName : '*';
			div.append(notation + '	');
		});
		div.append("<br/>");
	});

};

