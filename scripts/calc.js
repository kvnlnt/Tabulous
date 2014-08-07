Tabulous.prototype.calcFingersUsed = function(tab){

	var fingersUsed = 0;
	var tab = _.chain(tab).compact().value().filter(function(t){ return t !== -1 });

	_.each(tab, function(t, i){


	});

	console.log(tab, fingersUsed);

	return fingersUsed;
	
};