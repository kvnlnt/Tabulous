Tabulous.prototype.assignData = function(voicings){

    var board = this.board;
    var data  = [];
    var root  = this.settings.root.toLowerCase();

    // loop data
    _.each(voicings, function(voicing){
        var tab = {};
        tab.voicing = voicing;
        tab.data = _.map(voicing, function(fret, string){
            var o = board[fret][string] || {};
            o.isRoot = root === o.toString(true) ? true : false;
            o.active = false;
            return o;
        });
        data.push(tab);
    });

    return data;
    
};


Tabulous.prototype.assignDataLabels = function(voicings){

    var that        = this;
    var chordLength = this.notes.length;
    var stringCount = this.tuning.length;
    var root        = that.settings.root.toLowerCase();

    // loop voicings
    _.each(voicings, function(voicing){

        // get which string index has the first occurance of the root
        var firstRoot = _.findIndex(voicing.data, function(note){ return note.toString(true) === root; });

        // assign index to start enabling notes
        var startActiveIndex = (stringCount - (firstRoot+1)) >= chordLength ? firstRoot : (stringCount - chordLength) - 1;

        console.log('------------------------------------');

        _.each(voicing.data, function(note, i){

            if(null !== note){

                note.active = i >= startActiveIndex ? true : false;

            }

            console.log(voicing.voicing, note.active, i);

        });
    });

    return voicings;

};