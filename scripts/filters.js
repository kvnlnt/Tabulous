Tabulous.prototype.filterPlayableChords = function(population){

	var filter = [];

	// loop all voicings
	_.each(population, function(p, i){

		var voicing               = p.voicing;
		var fingersUsed           = 0;
		var fretsCounted          = [];
		var hasOpenOrMutedStrings = _.contains(voicing, 0);
		var voicingsFretted 	  = _.filter(voicing,function(v,vi){ return v > 0 && p.data[vi].active });
		var firstFret             = _.sortBy(voicingsFretted)[0];
		var voicingSorted         = voicing.slice(0);

		// loop frets
		_.each(voicingSorted, function(fret, j){
			
			var isFretted 				= !_.contains([0,-1],fret);
			var numStringsFretted     	= _.filter(voicingsFretted, function(v){ return v === fret }).length;
			var fretCounted 			= _.contains(fretsCounted, fret);

			// finger counting logic
			if(!fretCounted){
				if(!hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += 1; }
				if(hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += numStringsFretted; }
				if(firstFret !== fret){ fingersUsed += numStringsFretted }
			}
			
			fretsCounted.push(fret);


		});

		if(fingersUsed <= 4) { 
			filter.push(p);
			// console.log('playable', voicing, fingersUsed, p, p.data.toString());
		} else {
			// console.log('unplayable', voicing, fingersUsed, p, p.data.toString());
		}

	});

	return filter;

};

Tabulous.prototype.filterUnplayable = function(){

};

Tabulous.prototype.filterDupVoicings = function(voicings){
	
	var uniqs = [];
	var uniq_voicings = [];

	_.each(voicings, function(voicing){
		var found = void 0 === _.find(uniqs,voicing);
		if(found){ 
			uniqs.push(voicing);
			uniq_voicings.push(voicing);
		}
	});

	return uniq_voicings;

};