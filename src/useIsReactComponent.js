// useIsReactComponent.js - JavaScript version
// React hooks for component validation

// Get React instance (works in various environments)
function getReact() {
  // Try global React first (browser)
  if (typeof window !== 'undefined' && window.React) {
    return window.React;
  }
  
  // Try global React (Node.js with global)
  if (typeof global !== 'undefined' && global.React) {
    return global.React;
  }
  
  // Try require (Node.js)
  try {
    return require('react');
  } catch (e) {
    // React not available
    return null;
  }
}

// Import getReactComponentInfo from the main module
import { getReactComponentInfo } from './isReactComponent.js';

/**
 * React hook to check if a value is a React component
 * Useful for dynamic component rendering scenarios
 */
export function useIsReactComponent(value, includeElements = false) {
  const React = getReact();
  
  if (!React || !React.useMemo) {
    // Fallback for environments without hooks
    return getReactComponentInfo(value, includeElements);
  }
  
  return React.useMemo(() => getReactComponentInfo(value, includeElements), [value, includeElements]);
}

/**
 * Hook version that returns boolean
 */
export function useIsComponent(value, includeElements = false) {
  const info = useIsReactComponent(value, includeElements);
  return info.isComponent;
}
