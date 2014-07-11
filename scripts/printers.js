Tabulous.prototype.print = function(){

	Lazy(this.board).each(function(strings, fret){
		// console.log("fret",fret);
		Lazy(strings).each(function(string){
			// console.log("string",string.note);
		});
	});

	return this;

};