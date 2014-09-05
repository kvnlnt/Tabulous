Tabulous.prototype.assignData = function(voicings){

    var board = this.board;
    var data  = [];
    var root  = this.settings.root.toLowerCase();

    // loop data
    _.each(voicings, function(voicing){
        var tab = {};
        tab.voicing = voicing;
        tab.data = _.map(voicing, function(fret, string){
            if(fret === 'X'){
                var o = null;
            } else {
                var o = board[fret][string];
            }
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

        // assign active state
        voicing.data = _.map(voicing.data, function(note, i){

            var isActive = i >= firstRoot || i >= (stringCount-chordLength) ? true : false;
            var isRoot = root === note.toString(true) ? true : false;
            var obj = { teoria:note, isRoot:isRoot, isActive:isActive };

            return obj;

        });


    });

    return voicings;

};