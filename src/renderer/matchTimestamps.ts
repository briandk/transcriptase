// interface LabelledValue {
//   label: string;
// }
interface MatchedTimestamp {
  index: number;
  length: number;
}

function matchTimestamps(inputText: string): MatchedTimestamp[] {
  const lengthOfDelimiter = 1; // Have to advance past/before the opening/closing brackets
  const bracketPattern: RegExp = /\[(\d|:|.)+]/g;
  let match: RegExpExecArray | null = bracketPattern.exec(inputText);
  let matches: MatchedTimestamp[] = [];
  let startingIndex: number;
  let matchLength: number;

  while (match !== null) {
    startingIndex = match.index + lengthOfDelimiter;
    matchLength = bracketPattern.lastIndex - startingIndex - lengthOfDelimiter;
    matches = matches.concat({
      index: startingIndex,
      length: matchLength,
    });
    match = bracketPattern.exec(inputText);
  }
  return matches;
}

export { MatchedTimestamp, matchTimestamps };
