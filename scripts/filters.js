Tabulous.prototype.filterPlayableChords = function(population){

	var filter = [];

	// loop all voicings
	_.each(population, function(voicing, i){

		var fingersUsed           = 0;
		var fretsCounted          = [];
		var hasOpenOrMutedStrings = _.contains(voicing, 0);
		var voicingsFretted 	  = _.filter(voicing,function(v){ return v > 0 });
		var firstFret             = voicingsFretted.sort()[0];
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
			filter.push(voicing);
		}		

	});

	return filter;

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

// Tabulous.prototype.filterInversions = function(voicings){

// 	var that      = this;
// 	var foundRoot = false;
// 	var root      = that.settings.root.toLowerCase();

// 	_.each(voicings, function(voicing){
// 		_.each(voicing.data, function(note){

// 			if(null !== note){

// 				var curr_note = note.toString(true);
// 				var enharmonics = _.map(note.enharmonics(), function(enharmonic){ return enharmonic.toString(true); });
// 				if(root === curr_note || _.contains(enharmonics, root)){ foundRoot = true; }
// 				if(!foundRoot){ 
// 					note.inverted = true; 
// 				} else {
// 					note.inverted = false;
// 				}

// 			}
			

// 		});
// 	});

// 	return voicings;

// };

// Tabulous.prototype.filterKORDFU = function(population){

// 	var filter = [];

// 	// loop all voicings
// 	_.each(population, function(voicing, i){

// 		var fingersUsed           = 0;
// 		var fretsCounted          = [];
// 		var hasOpenOrMutedStrings = _.contains(voicing.voicing, 0);
// 		var voicingsFretted 	  = _.filter(voicing.voicing,function(v){ return v > 0 });
// 		var firstFret             = voicingsFretted.sort()[0];
// 		var voicingSorted         = voicing.voicing.slice(0);

// 		// loop frets
// 		_.each(voicingSorted, function(fret, j){
			
// 			var isFretted 				= !_.contains([0,-1],fret);
// 			var numStringsFretted     	= _.filter(voicingsFretted, function(v){ return v === fret }).length;
// 			var fretCounted 			= _.contains(fretsCounted, fret);

// 			// finger counting logic
// 			if(!fretCounted){
// 				if(!hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += 1; }
// 				if(hasOpenOrMutedStrings && firstFret === fret){ fingersUsed += numStringsFretted; }
// 				if(firstFret !== fret){ fingersUsed += numStringsFretted }
// 			}
			
// 			fretsCounted.push(fret);


// 		});

// 		if(fingersUsed <= 4) { 
// 			filter.push(voicing);
// 		}		

// 	});

// 	return filter;

// };