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

// Copy JavaScript files to dist
const srcDir = path.join(__dirname, '..', 'src');
const filesToCopy = [
  'isReactComponent.js',
  'reactComponentGuards.js', 
  'useIsReactComponent.js',
  'withComponentValidation.js'
];

filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file} to dist/`);
  } else {
    console.warn(`⚠️  ${file} not found in src/`);
  }
});

// Create main index.js for dist
const indexPath = path.join(distDir, 'index.js');
const indexContent = `// index.js - JavaScript version of is-react-comp
// Built for distribution

// Main utility functions
export {
  isReactComponent,
  getReactComponentInfo
} from './isReactComponent.js';

// Type guards
export {
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement
} from './reactComponentGuards.js';

// React hooks
export {
  useIsReactComponent,
  useIsComponent
} from './useIsReactComponent.js';

// Higher-Order Component
export {
  withComponentValidation,
} from './withComponentValidation.js';

// Version information
export const VERSION = '1.0.0';

// Package metadata
export const PACKAGE_INFO = {
  name: 'is-react-comp',
  version: '1.0.0',
  description: 'Production-grade React component validation utilities'
};

// Default export for convenience
import { isReactComponent as defaultCheck } from './isReactComponent.js';
export default defaultCheck;
`;

fs.writeFileSync(indexPath, indexContent);
console.log('✅ Created dist/index.js');

// Create CommonJS version
const cjsIndexPath = path.join(distDir, 'index.cjs');
const cjsContent = `// index.cjs - CommonJS version of is-react-comp
// Built for distribution

// Main utility functions
const {
  isReactComponent,
  getReactComponentInfo
} = require('./isReactComponent.js');

// Type guards
const {
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement
} = require('./reactComponentGuards.js');

// React hooks
const {
  useIsReactComponent,
  useIsComponent
} = require('./useIsReactComponent.js');

// Higher-Order Component
const {
  withComponentValidation,
} = require('./withComponentValidation.js');

// Version information
const VERSION = '1.0.0';

// Package metadata
const PACKAGE_INFO = {
  name: 'is-react-comp',
  version: '1.0.0',
  description: 'Production-grade React component validation utilities'
};

// Default export for convenience
module.exports = {
  isReactComponent,
  getReactComponentInfo,
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement,
  useIsReactComponent,
  useIsComponent,
  withComponentValidation,
  VERSION,
  PACKAGE_INFO,
  default: isReactComponent
};
`;

fs.writeFileSync(cjsIndexPath, cjsContent);
console.log('✅ Created dist/index.cjs');

console.log('\n🎉 JavaScript build completed!');
