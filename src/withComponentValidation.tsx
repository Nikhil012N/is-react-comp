import React from "react";
import { getReactComponentInfo } from "./isReactComponent";

export function withComponentValidation<P extends object>(
  WrappedComponent: React.ComponentType<P> | unknown,
  options: {
    fallback?: React.ReactNode | ((props: P) => React.ReactNode);
    errorMessage?: string;
    strict?: boolean;
  } = {}
): React.ComponentType<P> {
  const {
    fallback = null,
    errorMessage = "Invalid React component provided",
    strict = true,
  } = options;

  const componentInfo = getReactComponentInfo(WrappedComponent, false);

  const ValidatedComponent: React.FC<P> = (props) => {
    // valid component → pass props normally
    if (componentInfo.isComponent) {
      const Component = WrappedComponent as React.ComponentType<P>;
      return <Component {...props} />;
    }

    // invalid component
    if (strict && process.env.NODE_ENV === "development") {
      console.error(errorMessage, WrappedComponent);
    }

    // fallback handling
    if (typeof fallback === "function") {
      return <>{fallback(props)}</>;
    }

    return <>{fallback}</>;
  };

  ValidatedComponent.displayName = "WithComponentValidation";

  return ValidatedComponent;
}