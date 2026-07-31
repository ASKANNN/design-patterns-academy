const TYPE_TOKEN = '[A-Za-z_$][\\w$.<>\\[\\], |&]*';
const NAME_TOKEN = '[A-Za-z_$][\\w$]*';

export function stripTypes(code) {
  const objectArgs = [];
  const masked = code.replace(/\w+\(\s*\{[^{}]*\}\s*\)/g, (m) => {
    objectArgs.push(m);
    return `\0${objectArgs.length - 1}\0`;
  });

  const stripped = masked
    .replace(new RegExp(`\\binterface\\s+${NAME_TOKEN}(?:<[^>]*>)?\\s*\\{[^}]*\\}\\n?`, 'g'), '')
    .replace(new RegExp(`^[ \\t]*(?:public|private|protected)?\\s*abstract\\s+${NAME_TOKEN}\\s*\\([^)]*\\)\\s*:\\s*[^;{]+;\\s*\\n?`, 'gm'), '')
    .replace(/\babstract\s+(?=class\b)/g, '')
    .replace(new RegExp(`\\bimplements\\s+${NAME_TOKEN}(?:<[^>]*>)?\\s*`, 'g'), '')
    .replace(new RegExp(`(${NAME_TOKEN})<(?:[^<>()]|<[^<>()]*>)*>(?=\\()`, 'g'), '$1')
    .replace(new RegExp(`\\)\\s*:\\s*\\{[^{}]*\\}\\s*(?=\\{)`, 'g'), ')')
    .replace(new RegExp(`\\)\\s*:\\s*${TYPE_TOKEN}(?=\\s*\\{)`, 'g'), ')')
    .replace(new RegExp(`\\}\\s*:\\s*${NAME_TOKEN}(?=\\s*[),])`, 'g'), '}')
    .replace(/(?<=[\w$)\]])!(?=[;,.):])/g, '')
    .replace(/(constructor\s*\(([^)]*)\)\s*\{)(\s*super\([^)]*\)\s*;?)?/g, (match, head, params, superCall = '') => {
      const assigns = params
        .split(',')
        .map((p) => p.match(/^\s*(?:public|private|protected|readonly)\s+(?:(?:public|private|protected|readonly)\s+)*([A-Za-z_$][\w$]*)/))
        .filter(Boolean)
        .map(([, name]) => `this.${name} = ${name};`);
      return assigns.length ? `${head}${superCall}${assigns.join('')}` : match;
    })
    .replace(/\b(public|private|protected|readonly)\s+/g, '')
    .replace(new RegExp(`(${NAME_TOKEN})\\s*:\\s*${TYPE_TOKEN}(?=\\s*[;,)=])`, 'g'), '$1');

  return stripped.replace(/\0(\d+)\0/g, (_, i) => objectArgs[Number(i)]);
}
