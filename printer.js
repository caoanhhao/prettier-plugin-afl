function getIndent(level) {
  return "\t".repeat(level);
}

function formatLine(line, indentLevel) {
  const trimmed = line.trim();

  // Nếu là dòng bắt đầu khối
  if (/^(if|for|while|switch)\b.*\{$/.test(trimmed)) {
    return getIndent(indentLevel) + trimmed;
  }

  // Dòng bình thường
  return getIndent(indentLevel) + trimmed;
}

module.exports = {
  print(path) {
    const node = path.getValue();

    if (node.type === "Program") {
      let indentLevel = 0;
      const lines = node.body.map(lineNode => {
        const line = lineNode.value.trim();

        // Giảm indent nếu là dòng đóng khối
        if (line === "}") indentLevel--;

        const formatted = formatLine(line, indentLevel);

        // Tăng indent sau dòng mở khối
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
