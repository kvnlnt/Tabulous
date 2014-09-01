Tabulous.prototype.printBoard = function(){

	var div = $("<pre>");

	// body print
	$("body").append(div);
	div.append("<h2>Board</h2>");

	_.each(this.board, function(string, s){
		_.each(string, function(fret, f){
			var enHarmCount = string[f].enharmonics().length;
			if(enHarmCount > 0){
				if(enHarmCount > 1){
					var enharm = '/' + string[f].enharmonics()[0].toString() + '/' + string[f].enharmonics()[1].toString();
				} else {
					var enharm = '/' + string[f].enharmonics()[0].toString() + '/';
				}
			} else {
				var enharm = '';
			}
			div.append(string[f].toString() + enharm + '	');
		});
		div.append("<br/>");
	});

	// console
	_.each(this.board, function(string, s){
		_.each(string, function(fret, f){

			var enharm = string[f].enharmonics().length ? string[f].enharmonics().toString() : 'x';

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

	var div        = $("<table border=1>");
	var chordNotes = _.map(this.notes, function(note){ return note.name() + note.accidental(); });

	// body print
	$("body").append(div);
	div.append("<h2>Tab</h2>");
	_.each(this.board, function(string, s){
		var tr = $("<tr>");
		div.append(tr);
		tr.append('<td>' + s + '</td>');
		_.each(string, function(fret, f){

			var note          = string[f];
			var enharmName    = '';
			var enharm1       = '';
			var enharm2       = '';

			if(note.enharmonics().length){
				enharmName += note.enharmonics()[0].toString(true);
				enharm1 = note.enharmonics()[0].toString(true);
				if(note.enharmonics().length === 2){
					enharmName += '/' + note.enharmonics()[1].toString(true);
					enharm2 = note.enharmonics()[1].toString(true);
				}
			}
			
			var noteName      = note.name() + note.accidental();
			var isChordNote   = _.contains(chordNotes, noteName) || _.contains(chordNotes, enharm1) || _.contains(chordNotes, enharm2);
			var notation = true === isChordNote ? noteName + '/' + enharmName : '*';
			tr.append('<td>' + notation + '</td>');
		});
	});

};

Tabulous.prototype.printVoicings = function(voicings) {

	var voicings = voicings || this.voicings;

	_.each(voicings, function(voicing){
		console.log(voicing.toString());
	});

};

