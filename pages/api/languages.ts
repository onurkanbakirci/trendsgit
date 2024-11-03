import type { NextApiRequest, NextApiResponse } from 'next';
import getTrendingRepos from 'scripts/github-setup';

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const languages = [
    'TypeScript',
    'CSS',
    'JavaScript',
    'Rust',
    'HTML',
    'Inno Setup',
    'Scilab',
    'Shell',
    'PowerShell',
    'Batchfile',
    'SCSS',
    'Scheme',
    'Groovy',
    'Cuda',
    'C++',
    'Makefile',
    'Python',
    'Perl',
    'Ruby',
    'TeX',
    'Objective-C',
    'Objective-C++',
    'Clojure',
    'Handlebars',
    'Less',
    'PHP',
    'Dockerfile',
    'Julia',
    'Jupyter Notebook',
    'Visual Basic .NET',
    'C#',
    'C',
    'Raku',
    'Pug',
    'Go',
    'F#',
    'Java',
    'CoffeeScript',
    'R',
    'Roff',
    'ShaderLab',
    'Dart',
    'Swift',
    'Lua',
    'HLSL',
    'Hack'
  ];
  return res.status(200).json({ data: languages });
}

export default handler;
