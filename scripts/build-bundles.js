#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create package.json for dist
const packageJson = {
  name: 'is-react-comp',
  version: '1.0.0',
  description: 'Production-grade React component validation utilities',
  main: 'index.cjs',
  module: 'index.js',
  types: 'index.d.ts',
  type: 'module',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './index.cjs'
    },
    './cjs': {
      types: './index.d.ts',
      require: './index.cjs'
    },
    './esm': {
      types: './index.d.ts',
      import: './index.js'
    }
  },
  files: [
    '*.js',
    '*.d.ts',
    'src/**/*'
  ],
  keywords: [
    'react',
    'component',
    'validation',
    'detection',
    'type-guards',
    'utilities',
    'runtime',
    'javascript',
    'typescript',
    'react16',
    'react17',
    'react18',
    'react19'
  ],
  repository: {
    type: 'git',
    url: 'https://github.com/nikhil012nk/is-react-comp.git'
  },
  author: 'Nikhil Kumar <nikhil012nk@gmail.com>',
  license: 'MIT',
  peerDependencies: {
    'react': '>=16.8.0',
    'typescript': '>=4.0.0'
  },
  peerDependenciesMeta: {
    'typescript': {
      'optional': true
    }
  }
};

const packageJsonPath = path.join(distDir, 'package.json');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Created dist/package.json');

// Copy README to dist
const readmePath = path.join(__dirname, '..', 'README.md');
const distReadmePath = path.join(distDir, 'README.md');
if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, distReadmePath);
  console.log('✅ Copied README.md to dist/');
}

// Create LICENSE file
const licenseContent = `MIT License

Copyright (c) 2024 Nikhil Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const licensePath = path.join(distDir, 'LICENSE');
fs.writeFileSync(licensePath, licenseContent);
console.log('✅ Created LICENSE');

console.log('\n🎉 Bundle build completed!');
