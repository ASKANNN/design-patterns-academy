const TYPE_TOKEN = '[A-Za-z_$][\\w$.<>\\[\\], |&]*';

export function stripTypes(code) {
  return code
    .replace(new RegExp(`\\)\\s*:\\s*${TYPE_TOKEN}(?=\\s*\\{)`, 'g'), ')')
    .replace(/\b(public|private|protected|readonly)\s+/g, '')
    .replace(new RegExp(`([A-Za-z_$][\\w$]*)\\s*:\\s*${TYPE_TOKEN}(?=[;,)=])`, 'g'), '$1');
}
