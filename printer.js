const indentUnit = options.useTabs ? '\t' : ' ';
const indentWidth = options.indentWidth || 2;

function getIndent(level) {
  return indentUnit.repeat(level * indentWidth);
}

function formatLine(line, indentLevel) {
  const trimmed = line.trim();

  // If the line is empty, do not add indent
  if (trimmed === "") {
    return trimmed;
  }

  // If the line starts a block
  if (/^(if|for|while|switch)\b.*\{$/.test(trimmed)) {
    return getIndent(indentLevel) + trimmed;
  }

  // Normal line
  return getIndent(indentLevel) + trimmed;
}

module.exports = {
  print(path) {
    const node = path.getValue();

    if (node.type === "Program") {
      let indentLevel = 0;
      const lines = node.body.map(lineNode => {
        const line = lineNode.value.trim();

        // Decrease indent if the line closes a block
        if (line === "}") indentLevel--;

        const formatted = formatLine(line, indentLevel);

        // Increase indent after a line that opens a block
        if (/{\s*$/.test(line)) indentLevel++;

        return formatted;
      });

      return lines.join("\n");
    }

    if (node.type === "Line") {
      return node.value;
    }

    return "";
  }
};
