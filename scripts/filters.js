Tabulous.prototype.filterDupVoicings = function(voicings){
	
	var uniqs = [];
	var uniq_voicings = [];

	_.each(voicings, function(voicing){
		var found = void 0 === _.find(uniqs,voicing.voicing);
		if(found){ 
			uniqs.push(voicing.voicing);
			uniq_voicings.push(voicing);
		}
	});

	return uniq_voicings;

};

Tabulous.prototype.filterKORDFU = function(population){

	var filter = [];

	// loop all voicings
	_.each(population, function(voicing, i){

		var fingersUsed           = 0;
		var fretsCounted          = [];
		var hasOpenOrMutedStrings = _.contains(voicing.voicing, 0) || _.contains(voicing.voicing, 1);
		var voicingsFretted 	  = _.filter(voicing.voicing,function(v){ return v > 0 });
		var firstFret             = voicingsFretted.sort()[0];

		// loop frets
		_.each(voicing.voicing, function(fret, j){
			
			var isFretted 				= !_.contains([0,-1],fret);
			var numStringsFretted     	= _.filter(voicingsFretted, function(v){ return v === fret }).length;
			var fretCounted 			= _.contains(fretsCounted, fret);

			// finger counting logic
			if(!fretCounted){
				if(!hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += 1; }
				if(hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += numStringsFretted }
				if(firstFret !== fret){ fingersUsed += numStringsFretted }
			}
			
			fretsCounted.push(fret);


		});

		if(fingersUsed <= 5) { 
			filter.push(voicing);
			// console.log(voicing.voicing, "fingersUsed=", fingersUsed, hasOpenOrMutedStrings);
		}
		

	});

	return filter;

};