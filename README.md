# is-react-comp

![npm version](https://img.shields.io/npm/v/is-react-comp)  
![License](https://img.shields.io/npm/l/is-react-comp)  
![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-blue)  
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)  
![React](https://img.shields.io/badge/React-16.8%2B-blue)

**Production-grade utilities for validating and working with React components at runtime. Compatible with all React versions from 16.8+ and works with both TypeScript and JavaScript projects.**

---

## 🔍 Overview

`is-react-comp` is a comprehensive library that provides runtime utilities for detecting, validating, and working with React components. It supports all React component types including function components, class components, forwardRef, memo, lazy components, and React elements.

### 🌟 Universal Compatibility
- **React Versions**: Works with React 16.8, 17, 18, and 19+
- **Type Support**: Full TypeScript support + pure JavaScript version
- **Environment**: Browser, Node.js, and universal/isomorphic apps
- **Module Systems**: ESM, CommonJS, and TypeScript modules

Perfect for:
- Runtime component validation in dynamic rendering scenarios
- Component introspection and debugging tools
- Higher-order components that need to validate their inputs
- Testing utilities and component analysis tools
- Legacy React 16.8+ projects and modern React 19+ apps

---

## ✨ Features

- **🎯 Comprehensive Detection**: Supports all React component types
  - Function components
  - Class components  
  - ForwardRef components
  - Memo components
  - Lazy components
  - React elements (optional)

- **🛡️ Type Safety**: Full TypeScript support with proper type guards
- **⚡ Performance Optimized**: Efficient runtime checks with minimal overhead
- **🔧 Flexible Configuration**: Configurable strictness and element inclusion
- **🎣 React Hooks**: Built-in hooks for component validation in React components
- **🏗️ HOC Support**: Higher-order component for runtime validation
- **🌐 Universal**: Works across all React versions (16.8+) and environments
- **📦 Dual Support**: TypeScript and JavaScript implementations included

---

## 📦 Installation

```bash
# npm
npm install is-react-comp

# yarn
yarn add is-react-comp

# pnpm
pnpm add is-react-comp

# bun
bun add is-react-comp
```

### Peer Dependencies

- `react` >= 16.8.0 (hooks introduction)
- `typescript` >= 4.0.0 (optional, only for TypeScript projects)

---

## 🚀 Quick Start

### TypeScript Projects
```typescript
import {
  isReactComponent,
  getReactComponentInfo,
  isFunctionComponent,
  useIsComponent,
  withComponentValidation
} from 'is-react-comp';

// Basic component checking
if (isReactComponent(MyComponent)) {
  console.log('This is a valid React component!');
}

// Get detailed component information
const info = getReactComponentInfo(MyComponent);
console.log(info.componentType); // 'function' | 'class' | 'forwardRef' | 'memo' | 'lazy' | 'element'
console.log(info.displayName);   // Component display name
```

### JavaScript Projects
```javascript
import {
  isReactComponent,
  getReactComponentInfo,
  isFunctionComponent,
  useIsComponent,
  withComponentValidation
} from 'is-react-comp';

// Works exactly the same in JavaScript!
if (isReactComponent(MyComponent)) {
  console.log('This is a valid React component!');
}

const info = getReactComponentInfo(MyComponent);
console.log(info.componentType);
console.log(info.displayName);
}
```

### CommonJS (Node.js)
```javascript
const {
  isReactComponent,
  getReactComponentInfo,
  isFunctionComponent
} = require('is-react-comp');

// Works with CommonJS too
if (isReactComponent(MyComponent)) {
  console.log('Valid React component!');
}
```

---

## 📚 API Reference

### Core Functions

#### `isReactComponent(value, options?)`

Checks if a value is a React component.

```typescript
function isReactComponent(
  value: unknown,
  options?: {
    includeElements?: boolean; // Include React elements (default: false)
    strict?: boolean;          // Strict checking mode (default: true)
  }
): value is PossibleReactComponent;
```

#### `getReactComponentInfo(value)`

Returns detailed information about a React component.

```typescript
function getReactComponentInfo(value: unknown): ReactComponentCheckResult;
```

Returns:
```typescript
interface ReactComponentCheckResult {
  isComponent: boolean;
  componentType?: 'function' | 'class' | 'forwardRef' | 'memo' | 'lazy' | 'element';
  displayName?: string;
}
```

### Type Guards

#### `isFunctionComponent(component)`
#### `isClassComponent(component)`
#### `isMemoComponent(component)`
#### `isForwardRefComponent(component)`
#### `isLazyComponent(component)`
#### `isReactElement(element)`

Each function returns a boolean and provides proper TypeScript type narrowing.

### React Hooks

#### `useIsReactComponent(value, options?)`

```typescript
function useIsReactComponent<T>(
  value: T,
  options?: ComponentCheckOptions
): { isComponent: boolean; componentInfo: ReactComponentCheckResult };
```

#### `useIsComponent(value, options?)`

Alias for `useIsReactComponent`.

### Higher-Order Component

#### `withComponentValidation(Component, options?)`

Wraps a component with runtime validation.

```typescript
function withComponentValidation<P>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ReactNode;
    strict?: boolean;
  }
): React.ComponentType<P>;
```

---

## 🎯 Use Cases

### Dynamic Component Rendering

```typescript
function ComponentRegistry({ componentName, props }) {
  const Component = componentRegistry[componentName];
  const { isComponent } = useIsComponent(Component);
  
  if (!isComponent) {
    return <ErrorComponent message={`Invalid component: ${componentName}`} />;
  }
  
  return <Component {...props} />;
}
```

### Plugin Systems

```javascript
function PluginRenderer({ plugins }) {
  return plugins.map((plugin, index) => {
    if (isReactComponent(plugin.component)) {
      return React.createElement(plugin.component, { key: index, ...plugin.props });
    }
    return null;
  });
}
```

### Development Tools

```javascript
function ComponentInspector({ component }) {
  const info = getReactComponentInfo(component);
  
  return React.createElement('div', null, [
    React.createElement('h3', null, 'Component Info'),
    React.createElement('p', null, `Type: ${info.componentType}`),
    React.createElement('p', null, `Name: ${info.displayName}`),
    React.createElement('p', null, `Valid: ${info.isComponent ? '✅' : '❌'}`)
  ]);
}
```

---

## ⚙️ Configuration

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `includeElements` | `boolean` | `false` | Whether to consider React elements as components |
| `strict` | `boolean` | `true` | Enable strict checking mode for better accuracy |

### TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

### React Version Compatibility

| React Version | Supported | Features |
|---------------|-----------|----------|
| 16.8+ | ✅ | Hooks, memo, forwardRef, lazy |
| 17.x | ✅ | All features |
| 18.x | ✅ | All features + concurrent features |
| 19.x | ✅ | All features + latest React features |

---

## 🏗️ Project Structure

```
is-react-comp/
├── index.ts                    # TypeScript entry point
├── index.js                    # JavaScript entry point
├── src/
│   ├── isReactComponent.ts     # Core detection logic (TS)
│   ├── isReactComponent.js     # Core detection logic (JS)
│   ├── reactComponentGuards.ts # Type guards (TS)
│   ├── reactComponentGuards.js # Type guards (JS)
│   ├── useIsReactComponent.ts  # React hooks (TS)
│   ├── useIsReactComponent.js  # React hooks (JS)
│   ├── withComponentValidation.tsx # HOC (TS)
│   └── withComponentValidation.js # HOC (JS)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Development

```bash
# Install dependencies
bun install

# Run type checking
bun run tsc --noEmit

# Test JavaScript version
node test-js.js

# Build (if build script is added)
bun run build
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new functions
- Include JSDoc comments for public APIs
- Test with various React component types
- Ensure compatibility with React 16.8+

---

## 📄 License

MIT © [Nikhil Kumar](mailto:nikhil012nk@gmail.com)

---

## 🔗 Related Packages

- [React](https://reactjs.org/) - The core React library
- [TypeScript](https://www.typescriptlang.org/) - Type safety for JavaScript

---

## 📊 Package Info

- **Name**: `is-react-comp`
- **Version**: `1.0.0`
- **Author**: Nikhil Kumar
- **License**: MIT
- **Type**: ESM Module
- **Main**: `index.js` (JavaScript), `index.ts` (TypeScript)
- **React Support**: 16.8.0+
- **TypeScript Support**: 4.0.0+ (optional)

---

> **Note**: This package is designed to work with all React versions from 16.8+ (hooks introduction) through the latest React 19+. It provides both TypeScript and JavaScript implementations for maximum compatibility.
