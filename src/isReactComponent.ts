// isReactComponent.ts
import React from 'react';

export type PossibleReactComponent = 
  | React.ComponentType<any>
  | React.ReactElement
  | React.ForwardRefExoticComponent<any>
  | React.MemoExoticComponent<any>
  | React.LazyExoticComponent<any>;

export interface ReactComponentCheckResult {
  isComponent: boolean;
  componentType?: 'function' | 'class' | 'forwardRef' | 'memo' | 'lazy' | 'element';
  displayName?: string;
}

interface ComponentType {
  displayName?: string;
  name?: string;
}

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
export function isReactComponent(
  value: unknown,
  options: {
    includeElements?: boolean;      // Whether to consider React elements as components
    strict?: boolean;               // Strict checking mode
  } = {}
): value is PossibleReactComponent {
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
export function getReactComponentInfo(
  value: unknown,
  includeElements: boolean = false
): ReactComponentCheckResult {
  const result: ReactComponentCheckResult = {
    isComponent: false
  };
  
  if (!value) return result;
  
  // Check for React element
  if (includeElements && isReactElementSafe(value)) {
    result.isComponent = true;
    result.componentType = 'element';
    const element = value as React.ReactElement;
    const type = element.type;
    if (typeof type === 'function' || (typeof type === 'object' && type !== null)) {
      result.displayName = (type as any).displayName || (type as any).name || 'UnknownElement';
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
      
      result.displayName = (value as React.ComponentType).displayName || 
                           (value as React.ComponentType).name || 
                           'UnknownComponent';
      return result;
    }
  }
  
  // Check for special React component types
  if (isForwardRefComponent(value)) {
    result.isComponent = true;
    result.componentType = 'forwardRef';
    result.displayName = getSpecialComponentDisplayName(value as any) || 'ForwardRef';
    return result;
  }
  
  if (isMemoComponent(value)) {
    result.isComponent = true;
    result.componentType = 'memo';
    result.displayName = getSpecialComponentDisplayName(value as any) || 'Memo';
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
function isReactElementSafe(value: any): boolean {
  // Try React.isValidElement first (available in all React versions)
  if (typeof React.isValidElement === 'function') {
    return React.isValidElement(value);
  }
  
  // Fallback check for older React versions
  return value && 
         typeof value === 'object' && 
         value.$$typeof === Symbol.for('react.element');
}

// Private helper functions
function isValidComponentType(comp: any, strict: boolean = true): boolean {
  if (typeof comp !== 'function') return false;
  
  // Basic check: must have render method or be a function that returns React element
  if (comp.prototype?.isReactComponent) {
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

function isClassComponent(comp: any): boolean {
  return comp?.prototype?.isReactComponent !== undefined || 
         comp?.prototype?.render !== undefined;
}

function isForwardRefComponent(value: any): boolean {
  // Check for React.forwardRef - works across versions
  return value?.$$typeof === Symbol.for('react.forward_ref');
}

function isMemoComponent(value: any): boolean {
  // Check for React.memo - works across versions
  return value?.$$typeof === Symbol.for('react.memo');
}

function isLazyComponent(value: any): boolean {
  // Check for React.lazy - works across versions
  return value?.$$typeof === Symbol.for('react.lazy');
}

function isSpecialReactComponent(value: any): boolean {
  return isForwardRefComponent(value) || 
         isMemoComponent(value) || 
         isLazyComponent(value);
}

function getSpecialComponentDisplayName(component: any): string | undefined {
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