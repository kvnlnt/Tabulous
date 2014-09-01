// cartesian combination
Tabulous.prototype.calcAllPossibleCombinations = function(args){

	var combinations = _.reduce(args, function(a, b) {
	    return _.flatten(_.map(a, function(x) {
	        return _.map(b, function(y) {
	            return x + '|' + y;
	        });
	    }), false);
	});

	var format = _.map(combinations, function(voicing){
		return _.map(voicing.split('|'), function(voice){
			return isNaN(voice) ? voice : parseInt(voice);
		});
	});

	// console.log(combinations, format);
	return format;

};

Tabulous.prototype.calcAllPossibleVoicings = function(startingFret, voicings){

	var voicings     = voicings || [];
	var startingFret = startingFret || 0;
	var range        = _.range(startingFret, startingFret + this.settings.span);
	var chordNotes   = _.map(this.notes, function(note){ return note.name() + note.accidental(); });
	var strings      = this.tuning;

	// loop strings
	var positions 	 = [];
	_.each(strings, function(string){
		var frets = [];
		_.each(range, function(fret){
			var note 	      = teoria.note.fromKey(string.key() + fret);
			var enharmName1	  = note.enharmonics().length ? note.enharmonics()[0].toString(true) : '';
			var enharmName2	  = note.enharmonics().length > 1 ? note.enharmonics()[1].toString(true) : '';
			var noteName      = note.toString(true);
			var isChordNote   = _.contains(chordNotes, noteName) || _.contains(chordNotes, enharmName1) || _.contains(chordNotes, enharmName2);
			if(isChordNote){
				frets.push(fret);
			}
		});
		positions.push(frets);
	});

	// remove empty notes, replace with 'x'
	_.each(positions, function(position){ if(position.length === 0) position.push('X'); });
	var combinations = this.calcAllPossibleCombinations(positions);
	var startFret    = startingFret + 1; // if we just passed the 12th fret, reset algo starting fret
	var cont         = (startingFret + this.settings.span) < this.settings.frets; // continue if we have more frets to walk

	// tally up
	_.each(combinations, function(combination){
		voicings.push(combination);
	});

	return true === cont ? this.calcAllPossibleVoicings(startFret, voicings) : voicings;


};