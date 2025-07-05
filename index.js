const parser = require("./parser");
const printer = require("./printer");

module.exports = {
  languages: [
    {
      name: "AFL",
      parsers: ["afl"],
      extensions: [".afl"]
    }
  ],
  parsers: {
    afl: parser
  },
  printers: {
    afl: printer
  }
};
