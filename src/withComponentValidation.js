// withComponentValidation.js - JavaScript version
// Higher-order component for runtime validation

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

export function withComponentValidation(WrappedComponent, options = {}) {
  const {
    fallback = null,
    errorMessage = "Invalid React component provided",
    strict = true,
  } = options;

  const componentInfo = getReactComponentInfo(WrappedComponent, false);

  const ValidatedComponent = (props) => {
    const React = getReact();
    
    // If React is not available, return fallback
    if (!React) {
      return typeof fallback === 'function' ? fallback(props) : fallback;
    }
    
    // valid component → pass props normally
    if (componentInfo.isComponent) {
      return React.createElement(WrappedComponent, props);
    }

    // invalid component
    if (strict && typeof process !== 'undefined' && process.env && process.env.NODE_ENV === "development") {
      console.error(errorMessage, WrappedComponent);
    }

    // fallback handling
    if (typeof fallback === "function") {
      return fallback(props);
    }

    return fallback;
  };

  ValidatedComponent.displayName = "WithComponentValidation";

  return ValidatedComponent;
}
