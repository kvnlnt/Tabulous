Tabulous.prototype.setUp = function(){

	this.tuning   = this.getTuning();
	this.board    = this.getBoard();
	this.chord    = this.getChord();
	this.notes    = this.getNotes();
	this.voicings = this.getVoicings(0);

};

Tabulous.prototype.set = function(param, value){

	this.settings[param] = value;
	this.setUp();

};