// Tabulous.prototype.print = function(board, body, konsole){

// 	var body    = body || false;
// 	var konsole = konsole || false;
// 	var div     = $("<pre>");

// 	// body print
// 	if(body){

// 		$("body").append(div);
// 		div.append("<h2>Board</h2>");
// 		Lazy(board).each(function(string, s){
// 			Lazy(string).each(function(fret, f){
// 				var dash = string[f].length > 1 ? '--' : '---';
// 				div.append(string[f][0] + dash);
// 			});
// 			div.append("<br/>");
// 		});

// 	}

// 	// console
// 	if(konsole){

// 		Lazy(board).each(function(string, s){
// 			Lazy(string).each(function(fret, f){
// 				console.log("string", s, "fret",f, "note",string[f]);
// 			});
// 		});

// 	}
	

// 	return null;

// };