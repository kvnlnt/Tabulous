Tabulous.prototype.getBoard = function(){

	var that        = this;
	var fretRange   = Lazy.range(0, this.settings.frets);
	var stringRange = Lazy.range(0, this.settings.tuning.length);

	this.board = Lazy(fretRange).map(function(fret, fretI){
		return Lazy(stringRange).map(function(string, stringI){
			return {
				note:that.settings.tuning[stringI]
			};
		}).value().reverse();
	}).value();

	return this;

};

Tabulous.prototype.getStringScale = function(root, frets){

	var octaves   = Lazy.range(0, Math.ceil(frets/12) - 1) || [0];
	var chromatic = [['C'], ['C#','Db'], ['D'], ['D#','Eb'], ['E'], ['F'], ['F#','Gb'], ['G'], ['G#','Ab'], ['A'], ['A#','Bb'], ['B']];
	var noteIndex = Lazy(chromatic).map(function(note){ return note[0]; }).indexOf(root.split('/')[0]);
	var newScale  = chromatic.concat(chromatic.splice(0, noteIndex));
	
	// octave scale
	Lazy(octaves).each(function(){ newScale = newScale.concat(newScale); });

	var scale = Lazy(newScale).first(frets).value();

	return scale;

};