// useIsReactComponent.ts
import { useMemo } from 'react';
import { getReactComponentInfo, type ReactComponentCheckResult } from './isReactComponent';
/**
 * React hook to check if a value is a React component
 * Useful for dynamic component rendering scenarios
 */
export function useIsReactComponent(
  value: unknown,
  includeElements: boolean = false
): ReactComponentCheckResult {
  return useMemo(() => getReactComponentInfo(value, includeElements), [value, includeElements]);
}

/**
 * Hook version that returns boolean
 */
export function useIsComponent(
  value: unknown,
  includeElements: boolean = false
): boolean {
  const info = useIsReactComponent(value, includeElements);
  return info.isComponent;
}