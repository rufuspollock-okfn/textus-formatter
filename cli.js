// Command line interface for formatting texts
// 
// Take the named file, process it and producing an appropriate JSON
// description of it

var fs = require('fs');

if (process.argv.length < 3) {
	console.log('Must specify a filename to import : ' + process.argv[1] + ' FILENAME');
	process.exit(1);
}

var filename = process.argv[2];

fs.readFile(filename, 'utf8', function(error, data) {
	if (error) {
		throw error;
	}

  var parser = null;
  var out = parser.parse(data);
  var path = '';
	fs.writeFile(path + "/text.txt", out.text);
	fs.writeFile(path + "/typography.json", JSON.stringify(out.typography, null, 2));
	fs.writeFile(path + "/metadata.json", JSON.stringify(out.metadata, null, 2));
  // todo semantics ...

  console.log("Written " + filename + ".json");
});

