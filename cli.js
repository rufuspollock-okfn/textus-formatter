// Command line interface for formatting texts
// 
// Take the named file, process it and producing an appropriate JSON
// description of it

var fs = require('fs');
var path = require('path');
var parsers = {
  wikitext: require('./src/wikitext-parser.js'),
  text: require('./src/text-parser.js')
};

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

  var outpath = './';
  if (process.argv.length >= 4) {
    outpath = process.argv[3];
  }

  var ext = path.extname(filename);
  var parsertype = null;
  if (ext == '.wikitext' || ext == '.wikitxt') {
    parsertype = 'wikitext';
  } else {
    parsertype = 'text';
  }
  console.log("Interpreting input as file of type: " + parsertype);
  var parser = parsers[parsertype];

  var out = parser.parse(data);
	fs.writeFile(outpath + "text.txt", out.text);
	fs.writeFile(outpath + "typography.json", JSON.stringify(out.typography, null, 2));
	fs.writeFile(outpath + "metadata.json", JSON.stringify(out.metadata, null, 2));
  // todo semantics ...

  console.log("\nWritten results to: " + outpath + "text.txt, " + outpath + "typography.json etc");
});

