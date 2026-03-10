// reactComponentGuards.ts
import React from 'react';

// Type guards for specific React component types
export function isFunctionComponent<P = {}>(
  component: unknown
): component is React.FunctionComponent<P> {
  return typeof component === 'function' && 
         !isClassComponent(component) && 
         !isMemoComponent(component) && 
         !isForwardRefComponent(component);
}

export function isClassComponent<P = {}, S = {}>(
  component: unknown
): component is React.ComponentClass<P, S> {
  return typeof component === 'function' && 
         (component.prototype?.isReactComponent !== undefined || 
          component.prototype?.render !== undefined);
}

export function isMemoComponent<P = {}>(
  component: unknown
): component is React.MemoExoticComponent<React.ComponentType<P>> {
  return (component as any)?.$$typeof === Symbol.for('react.memo');
}

export function isForwardRefComponent<P = {}>(
  component: unknown
): component is React.ForwardRefExoticComponent<P> {
  return (component as any)?.$$typeof === Symbol.for('react.forward_ref');
}

export function isLazyComponent<P = {}>(
  component: unknown
): component is React.LazyExoticComponent<React.ComponentType<P>> {
  return (component as any)?.$$typeof === Symbol.for('react.lazy');
}

export function isReactElement<P = any>(
  element: unknown
): element is React.ReactElement<P> {
  return React.isValidElement(element);
}