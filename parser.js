module.exports = {
  parse(text) {
    const lines = text.split(/\r?\n/);
    return {
      type: "Program",
      body: lines.map((line, index) => ({
        type: "Line",
        value: line.trim(),
        loc: { start: { line: index + 1, column: 0 } }
      }))
    };
  },
  astFormat: "afl",
  locStart: node => 0,
  locEnd: node => node.value?.length || 0
};
