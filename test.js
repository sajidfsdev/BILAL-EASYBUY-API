const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("cities.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    //appending to file starts...
    fs.appendFile("output.txt", '"' + line + '"' + ",", function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    //zppend to file ends........
  }
}

processLineByLine();
