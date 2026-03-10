// reactComponentGuards.js - JavaScript version
// Type guards for specific React component types

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

// Safe React element check that works across versions
function isReactElementSafe(value) {
  const React = getReact();
  
  // Try React.isValidElement first (available in all React versions)
  if (React && typeof React.isValidElement === 'function') {
    return React.isValidElement(value);
  }
  
  // Fallback check for older React versions
  return value && 
         typeof value === 'object' && 
         value.$$typeof === Symbol.for('react.element');
}

// Type guards for specific React component types
export function isFunctionComponent(component) {
  return typeof component === 'function' && 
         !isClassComponent(component) && 
         !isMemoComponent(component) && 
         !isForwardRefComponent(component);
}

export function isClassComponent(component) {
  return typeof component === 'function' && 
         component && component.prototype && 
         (component.prototype.isReactComponent !== undefined || 
          component.prototype.render !== undefined);
}

export function isMemoComponent(component) {
  return component && component.$$typeof === Symbol.for('react.memo');
}

export function isForwardRefComponent(component) {
  return component && component.$$typeof === Symbol.for('react.forward_ref');
}

export function isLazyComponent(component) {
  return component && component.$$typeof === Symbol.for('react.lazy');
}

export function isReactElement(element) {
  return isReactElementSafe(element);
}
