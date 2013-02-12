exports.parse = function(data) {
  var currentPosition = 0;
  var string = [];
  var typography = [];

  var processString = function(line) {
    string.push(line);
    typography.push({
      start : currentPosition,
      end : currentPosition + line.length,
      css : (line.substring(0, 7) == "CHAPTER") ? "chapter" : "paragraph"
    });
    currentPosition += line.length;
  };

	linegroups = data.split(/(\r?\n){2,}/);
	linegroups.forEach(function(linegroup) {
		line = linegroup.split(/\r?\n/).join(" ");
		if (!line.match(/^\s+$/)) {
			processString(line);
		}
	});
	var text = string.join("");

  return {
		text : text,
		typography : typography,
		semantics : []
  };
};

