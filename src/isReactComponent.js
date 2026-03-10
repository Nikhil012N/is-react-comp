// isReactComponent.js - JavaScript version
// Compatible with React 16.8+ and all later versions

/**
 * Production-grade utility to check if a value is a React component
 * Handles various React component types including:
 * - Function components
 * - Class components
 * - ForwardRef components
 * - Memo components
 * - Lazy components
 * - React elements
 * 
 * Compatible with React 16.8+ (hooks introduction) and all later versions
 */
export function isReactComponent(value, options = {}) {
  const { includeElements = false, strict = true } = options;
  
  if (!value) return false;
  
  // Check for React element (created by createElement or JSX)
  if (includeElements && isReactElementSafe(value)) {
    return true;
  }
  
  // Check for function component or class component
  if (typeof value === 'function') {
    // Check if it's a valid React component type
    if (isValidComponentType(value, strict)) {
      return true;
    }
  }
  
  // Check for special React component types
  if (isSpecialReactComponent(value)) {
    return true;
  }
  
  return false;
}

/**
 * Detailed version that returns more information about the component
 */
export function getReactComponentInfo(value, includeElements = false) {
  const result = {
    isComponent: false
  };
  
  if (!value) return result;
  
  // Check for React element
  if (includeElements && isReactElementSafe(value)) {
    result.isComponent = true;
    result.componentType = 'element';
    const type = value.type;
    if (typeof type === 'function' || (typeof type === 'object' && type !== null)) {
      result.displayName = type.displayName || type.name || 'UnknownElement';
    } else {
      result.displayName = typeof type === 'string' ? type : 'UnknownElement';
    }
    return result;
  }

  // Check for function/class component
  if (typeof value === 'function') {
    if (isValidComponentType(value, true)) {
      result.isComponent = true;
      
      // Determine if class or function component
      if (isClassComponent(value)) {
        result.componentType = 'class';
      } else {
        result.componentType = 'function';
      }
      
      result.displayName = value.displayName || value.name || 'UnknownComponent';
      return result;
    }
  }
  
  // Check for special React component types
  if (isForwardRefComponent(value)) {
    result.isComponent = true;
    result.componentType = 'forwardRef';
    result.displayName = getSpecialComponentDisplayName(value) || 'ForwardRef';
    return result;
  }
  
  if (isMemoComponent(value)) {
    result.isComponent = true;
    result.componentType = 'memo';
    result.displayName = getSpecialComponentDisplayName(value) || 'Memo';
    return result;
  }
  
  if (isLazyComponent(value)) {
    result.isComponent = true;
    result.componentType = 'lazy';
    result.displayName = 'Lazy';
    return result;
  }
  
  return result;
}

// Safe React element check that works across versions
function isReactElementSafe(value) {
  // Try to get React from the global scope or require it
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

// Private helper functions
function isValidComponentType(comp, strict = true) {
  if (typeof comp !== 'function') return false;
  
  // Basic check: must have render method or be a function that returns React element
  if (comp.prototype && comp.prototype.isReactComponent) {
    return true; // Class component
  }
  
  if (!strict) {
    // In non-strict mode, just check if it's a function
    // This might have false positives
    return true;
  }
  
  // Strict mode: try to detect if it's a valid component
  // Check for common React component properties
  const hasComponentProperties = 
    comp.displayName !== undefined ||
    comp.propTypes !== undefined ||
    comp.defaultProps !== undefined ||
    comp.contextTypes !== undefined ||
    (typeof comp.name === 'string' && comp.name.length > 0 && comp.name[0] === comp.name[0].toUpperCase()); // Component names typically start with capital letter
  
  return hasComponentProperties;
}

function isClassComponent(comp) {
  return comp && comp.prototype && 
         (comp.prototype.isReactComponent !== undefined || 
          comp.prototype.render !== undefined);
}

function isForwardRefComponent(value) {
  // Check for React.forwardRef - works across versions
  return value && value.$$typeof === Symbol.for('react.forward_ref');
}

function isMemoComponent(value) {
  // Check for React.memo - works across versions
  return value && value.$$typeof === Symbol.for('react.memo');
}

function isLazyComponent(value) {
  // Check for React.lazy - works across versions
  return value && value.$$typeof === Symbol.for('react.lazy');
}

function isSpecialReactComponent(value) {
  return isForwardRefComponent(value) || 
         isMemoComponent(value) || 
         isLazyComponent(value);
}

function getSpecialComponentDisplayName(component) {
  if (component.displayName) {
    return component.displayName;
  }
  
  if (isForwardRefComponent(component) && component.render) {
    return component.render.name || 'ForwardRef';
  }
  
  if (isMemoComponent(component) && component.type) {
    return component.type.name || 'Memo';
  }
  
  return undefined;
}
