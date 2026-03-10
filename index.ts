// index.ts
// Main entry point for react-component-utils package

// Main utility functions
export {
  isReactComponent,
  getReactComponentInfo,
  type ReactComponentCheckResult,
  type PossibleReactComponent
} from './src/isReactComponent';

// Type guards
export {
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement
} from './src/reactComponentGuards';

// React hooks
export {
  useIsReactComponent,
  useIsComponent
} from './src/useIsReactComponent';

// Higher-Order Component
export {
  withComponentValidation,
} from './src/withComponentValidation';



// Version information
export const VERSION = '1.0.2';

// Package metadata
export const PACKAGE_INFO = {
  name: '@your-org/react-component-utils',
  version: '1.0.2',
  description: 'Production-grade React component validation utilities'
} as const;

// Default export for convenience
import { isReactComponent as defaultCheck } from './src/isReactComponent';
export default defaultCheck;