Utilities and libraries for converting source texts in a variety of formats
(HTML, markdown, wikisource etc) into [Textus format][format].

[format]: https://github.com/okfn/textus/blob/master/docs/json_import_format.md

## Installation and Usage

Requires nodejs.

Grab the source:

    git clone https://github.com/OpenHumanities/textus-formatter

Then use it:

    node cli.js

Will print out usage instructions.

A simple example:

    node cli.js test/wikitext.wikitxt out/

