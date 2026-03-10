// index.js - JavaScript version of is-react-comp
// Pure JavaScript implementation for non-TypeScript projects

// Main utility functions
export {
  isReactComponent,
  getReactComponentInfo
} from './src/isReactComponent.js';

// Type guards
export {
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement
} from './src/reactComponentGuards.js';

// React hooks
export {
  useIsReactComponent,
  useIsComponent
} from './src/useIsReactComponent.js';

// Higher-Order Component
export {
  withComponentValidation,
} from './src/withComponentValidation.js';

// Version information
export const VERSION = '1.0.3';

// Package metadata
export const PACKAGE_INFO = {
  name: 'is-react-comp',
  version: '1.0.3',
  description: 'Production-grade React component validation utilities'
};

// Default export for convenience
import { isReactComponent as defaultCheck } from './src/isReactComponent.js';
export default defaultCheck;
