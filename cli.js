// Command line interface for formatting texts
// 
// Take the named file, process it and producing an appropriate JSON
// description of it

var fs = require('fs');
var wikitext = require('./src/wikitext-parser.js');

if (process.argv.length < 3) {
  var usage = 'Usage: node cli.js {path-of-file-to-process} [{output-path}]';
  usage += '\n\n';
  usage += 'Several output files will be written: \n\
  {output-path}text.txt \n\
  {output-path}typography.json \n\
  {output-path}metadata.json \n\
  '
  console.log(usage);
	process.exit(1);
}

var filename = process.argv[2];

fs.readFile(filename, 'utf8', function(error, data) {
	if (error) {
		throw error;
	}

  var path = './';
  if (process.argv.length >= 4) {
    path = process.argv[3];
  }

  var parser = wikitext;
  var out = parser.parse(data);
	fs.writeFile(path + "text.txt", out.text);
	fs.writeFile(path + "typography.json", JSON.stringify(out.typography, null, 2));
	fs.writeFile(path + "metadata.json", JSON.stringify(out.metadata, null, 2));
  // todo semantics ...

  console.log("Written to: " + path + "text.txt etc");
});

