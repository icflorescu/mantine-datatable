import { readFile } from 'node:fs/promises';

/**
 * Read code examples from files, taking into account the following type of comments:
 *
 *  - `example-start [block name]`;
 *  - `example-skip [comment]`;
 *  - `example-resume`;
 *  - `example-end`;
 *
 * Lines containing a single `prettier-ignore` comment are ignored.
 * If a single, un-named block of code is found if the file, the method returns a string; otherwise
 * it returns an object with block name keys and string values
 */
export default async function readCodeExample(path: string): Promise<string | Record<string, string>> {
  const content = await readFile(path, { encoding: 'utf8' });
  if (
    !(
      content.match(/\/\/ +example-start/) ||
      content.match(/\{\/\* +example-start/) ||
      content.match(/\/\/ +example-skip/) ||
      content.match(/\{\/\* +example-skip/)
    )
  ) {
    return content;
  }

  const lines = content.split('\n');
  let result: string | Record<string, string> = '';
  let adding = !(content.match(/\/\/ +example-start/) || content.match(/\{\/\*\s+example-start/));
  let skipping: { commentStyle: 'ts' | 'react'; comment: string | null; indent: number } | null = null;
  let blockName: string | null = null;
  let indent = 0;
  for (const line of lines) {
    const startCodeMatch =
      line.match(/\/\/ +example-start(?: +(.*))?/) || line.match(/\{\/\*\s+example-start(?: +(.*))? +\*\/\}/);
    if (startCodeMatch) {
      adding = true;
      indent = startCodeMatch.index || 0;
      blockName = startCodeMatch[1] || null;
      if (blockName !== null) {
        if (typeof result === 'string') result = {};
        result[blockName] = '';
      }
      continue;
    }
    const skipCodeMatch =
      line.match(/\/\/ +example-skip(?: +(.*))?/) || line.match(/\{\/\* +example-skip(?: +(.*))? +\*\/\}/);
    if (skipCodeMatch) {
      adding = false;
      skipping = {
        indent: (skipCodeMatch.index || 0) - indent,
        commentStyle: skipCodeMatch[0].startsWith('//') ? 'ts' : 'react',
        comment: skipCodeMatch[1] || null,
      };
      continue;
    }
    if (/\/\/ +example-resume/.test(line) || /\{\/\* +example-resume/.test(line)) {
      adding = true;
      continue;
    }
    if (/\/\/ +example-end/.test(line) || /\{\/\* +example-end/.test(line)) {
      if (typeof result === 'string') break;
      adding = false;
      continue;
    }

    let addition = '';
    if (skipping) {
      addition =
        ' '.repeat(skipping.indent) +
        (skipping.commentStyle === 'ts' ? `// ${skipping.comment || ''}...` : `{/* ${skipping.comment || ''}... */}`) +
        '\n';
      skipping = null;
    } else if (adding && !(line.includes('// prettier-ignore') || line.includes('{/* prettier-ignore */}'))) {
      addition = line.slice(indent) + '\n';
    }
    if (addition) {
      if (blockName !== null) {
        (result as Record<string, string>)[blockName] += addition;
      } else {
        result += addition;
      }
    }
  }
  return result;
}
