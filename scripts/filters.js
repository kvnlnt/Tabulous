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