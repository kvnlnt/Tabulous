Tabulous.prototype.calcPopulation = function(startingFret, voicings){

	var voicings       = voicings || [];
	var startingFret   = startingFret || 0;
	var frettedStrings = []; // add strings as they are fretted
	var frets          = _.range(startingFret, startingFret + this.settings.span);
	var strings        = this.tuning;
	var chordNotes     = _.map(this.notes, function(note){ return note.name() + note.accidental(); });
	var tab            = _.map(strings, function(){ return -1 }); // prepopulated tab array of none found
	var data           = _.map(strings, function(){ return null });
	
	// loop frets
	_.each(frets, function(fret, fretsTraversed){

		// loop strings
		_.each(strings, function(string, stringNumber){

			var note          = teoria.note.fromKey(string.key() + fret);
			var enharmName 	  = note.enharmonics(true).length ? note.enharmonics(true)[0].name() + note.enharmonics(true)[0].accidental() : '';
			var noteName      = note.name() + note.accidental();
			var isChordNote   = _.contains(chordNotes, noteName) || _.contains(chordNotes, enharmName);
			var isFretted     = _.contains(frettedStrings, stringNumber);
			var lastFretFound = true === isFretted ? fret : lastFretFound;

			if(true === isChordNote && false === isFretted){
				frettedStrings.push(stringNumber);
				tab[stringNumber]  = fret;
				data[stringNumber] = note;
			}

		});

	});

	// get last fret used and determine if to continue
	// var prevLastFret = Lazy(Lazy(voicings).last()).compact().sortBy().last(); // get last fret of prev tab
	var prevLastFret = voicings.length > 0 ? _.chain(_.last(voicings).voicing).compact().sortBy().last().value() : 0;
	var lastFret     = _.chain(tab).compact().sortBy().last().value() // get current last fret
	var startFret    = startingFret + 1; // if we just passed the 12th fret, reset algo starting fret
	var cont         = (startingFret + this.settings.span) < this.settings.frets; // continue if we have more frets to walk

	// add tab
	voicings.push({ voicing:tab, data:data });

	var noDupVoicings                = this.filterDupVoicings(voicings);
	var labeledInvertedNotesVoicings = this.filterInversions(noDupVoicings);

	return true === cont ? this.calcPopulation(startFret, voicings) : labeledInvertedNotesVoicings;

};