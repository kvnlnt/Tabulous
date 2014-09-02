Tabulous.prototype.setUp = function(){

    this.tuning    = this.getTuning();
    this.board     = this.getBoard();
    this.chord     = this.getChord();
    this.notes     = this.getNotes();
    this.voicings  = this.getVoicings();

};

Tabulous.prototype.set = function(param, value){

	this.settings[param] = value;
	this.setUp();

};

Tabulous.prototype.setNoteLabels = function(voicings){

    var that        = this;
    var chordLength = this.notes.length;
    var root        = that.settings.root.toLowerCase();

    // _.each(voicings, function(voicing){
    //  _.each(voicing.data, function(note){

    //      if(null !== note){

    //          var curr_note = note.toString(true);
    //          var enharmonics = _.map(note.enharmonics(), function(enharmonic){ return enharmonic.toString(true); });
    //          if(root === curr_note || _.contains(enharmonics, root)){ foundRoot = true; }
    //          if(!foundRoot){ 
    //              note.inverted = true; 
    //          } else {
    //              note.inverted = false;
    //          }

    //      }
            

    //  });
    // });

    return voicings;

};