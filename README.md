# is-react-comp

![npm version](https://img.shields.io/npm/v/is-react-comp)  
![License](https://img.shields.io/npm/l/is-react-comp)  
![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-blue)  
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)  
![React](https://img.shields.io/badge/React-16.8%2B-blue)

**Production-grade utilities for validating and working with React components at runtime. Compatible with all React versions from 16.8+ and works with both TypeScript and JavaScript projects.**

---

## What does this do?

Sometimes you have a variable and you're not sure if it's a React component or not. This package helps you figure that out!

It works with:
- ✅ Regular function components
- ✅ Class components  
- ✅ Components wrapped in `memo()`
- ✅ Components wrapped in `forwardRef()`
- ✅ Lazy-loaded components
- ✅ React elements (optional)

---

## Quick Start

### Install it

```bash
npm install is-react-comp

# yarn
yarn add is-react-comp

# pnpm
pnpm add is-react-comp

# bun
bun add is-react-comp
```

### Use it

```javascript
import { isReactComponent } from 'is-react-comp';

function MyComponent() {
  return <div>Hello!</div>;
}

// Check if it's a React component
if (isReactComponent(MyComponent)) {
  console.log('Yep, this is a React component! 🎉');
}

// Works with regular variables too
const something = getSomethingFromSomewhere();
if (isReactComponent(something)) {
  // It's safe to render it
  return <something />;
}
```

---

## What else can you do?

### Get info about a component

```javascript
import { getReactComponentInfo } from 'is-react-comp';

const info = getReactComponentInfo(MyComponent);
console.log(info.componentType); // "function", "class", "memo", etc.
console.log(info.displayName);   // "MyComponent"
```

### Check for specific types

```javascript
import { 
  isFunctionComponent,
  isClassComponent,
  isMemoComponent 
} from 'is-react-comp';

if (isFunctionComponent(MyComponent)) {
  console.log('This is a function component');
}
```

### Use in React components

```javascript
import { useIsComponent } from 'is-react-comp';

function MyWrapper({ children }) {
  const { isComponent } = useIsComponent(children);
  
  if (!isComponent) {
    return <div>Not a valid component!</div>;
  }
  
  return children;
}
```

---

## Complete Examples

### Function Component
```javascript
import { isReactComponent, isFunctionComponent } from 'is-react-comp';

function MyButton({ text }) {
  return <button>{text}</button>;
}

console.log(isReactComponent(MyButton));        // true
console.log(isFunctionComponent(MyButton));     // true
```

### Class Component
```javascript
import { isReactComponent, isClassComponent } from 'is-react-comp';

class MyCounter extends React.Component {
  render() {
    return <div>Count: {this.props.count}</div>;
  }
}

console.log(isReactComponent(MyCounter));       // true
console.log(isClassComponent(MyCounter));        // true
```

### Memo Component
```javascript
import { isReactComponent, isMemoComponent } from 'is-react-comp';

const ExpensiveComponent = React.memo(function({ data }) {
  return <div>{data.map(item => <span key={item.id}>{item.name}</span>)}</div>;
});

console.log(isReactComponent(ExpensiveComponent));    // true
console.log(isMemoComponent(ExpensiveComponent));     // true
```

### ForwardRef Component
```javascript
import { isReactComponent, isForwardRefComponent } from 'is-react-comp';

const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

console.log(isReactComponent(MyInput));               // true
console.log(isForwardRefComponent(MyInput));          // true
```

### Lazy Component
```javascript
import { isReactComponent, isLazyComponent } from 'is-react-comp';

const LazyComponent = React.lazy(() => import('./MyComponent'));

console.log(isReactComponent(LazyComponent));         // true
console.log(isLazyComponent(LazyComponent));          // true
```

### React Elements
```javascript
import { isReactComponent, isReactElement } from 'is-react-comp';

const element = <div>Hello World</div>;
const component = function() { return <div>Hello</div>; };

console.log(isReactElement(element));                 // true
console.log(isReactElement(component));               // false

// Include elements in component check
console.log(isReactComponent(element, { includeElements: true }));  // true
console.log(isReactComponent(component, { includeElements: true })); // true
```

### Real-World Plugin System Example
```javascript
import { isReactComponent, getReactComponentInfo } from 'is-react-comp';

function PluginRenderer({ plugins }) {
  return plugins.map((plugin, index) => {
    // Validate each plugin is a React component
    if (!isReactComponent(plugin.component)) {
      console.error(`Plugin ${index} is not a valid React component`);
      return <div key={index}>Invalid plugin component</div>;
    }
    
    const info = getReactComponentInfo(plugin.component);
    
    return (
      <div key={index}>
        <h3>{plugin.name}</h3>
        <p>Type: {info.componentType}</p>
        <plugin.component {...plugin.props} />
      </div>
    );
  });
}

// Usage
const plugins = [
  {
    name: 'Header',
    component: () => <header>My App</header>,
    props: {}
  },
  {
    name: 'Footer', 
    component: React.memo(() => <footer>© 2024</footer>),
    props: {}
  }
];

<PluginRenderer plugins={plugins} />
```

### Component Validation with Fallback
```javascript
import { withComponentValidation } from 'is-react-comp';

// Your regular component
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Wrap with validation and fallback
const SafeUserProfile = withComponentValidation(UserProfile, {
  fallback: <div className="error">Failed to load user profile</div>,
  strict: true
});

// Usage - will show fallback if UserProfile is invalid
function App({ profileComponent }) {
  return <SafeUserProfile user={{ name: 'John', email: 'john@example.com' }} />;
}

// Dynamic component example
function DynamicComponentLoader({ component, fallback }) {
  const SafeComponent = withComponentValidation(component, {
    fallback: fallback || <div>Component not available</div>
  });
  
  return <SafeComponent />;
}

// Usage with potentially invalid component
const maybeInvalid = null; // Could be anything
<DynamicComponentLoader 
  component={maybeInvalid}
  fallback={<div className="loading-error">Component failed to load</div>}
/>
```

### Advanced Fallback Examples
```javascript
import { withComponentValidation } from 'is-react-comp';

// Custom fallback component
function ErrorFallback({ error, componentName }) {
  return (
    <div className="component-error">
      <h3>⚠️ Component Error</h3>
      <p>Failed to render: {componentName}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading component...</p>
    </div>
  );
}

// Wrap components with different fallbacks
const SafeHeader = withComponentValidation(HeaderComponent, {
  fallback: <ErrorFallback componentName="Header" />
});

const SafeLazyComponent = withComponentValidation(LazyComponent, {
  fallback: <LoadingFallback />
});

// Conditional fallback based on component type
function smartFallback(component) {
  const info = getReactComponentInfo(component);
  
  if (info.componentType === 'lazy') {
    return <LoadingFallback />;
  } else {
    return <ErrorFallback componentName={info.displayName || 'Unknown'} />;
  }
}

const SmartSafeComponent = withComponentValidation(SomeComponent, {
  fallback: smartFallback(SomeComponent)
});
```

---

## Why would you need this?

- **Plugin systems**: When users can pass in custom components
- **Dynamic rendering**: When you're not sure what you're getting
- **Debugging**: To figure out what type of component you're working with
- **Component libraries**: To validate user input

---

## Options

You can customize how it works:

```javascript
// Include React elements as components too
isReactComponent(something, { includeElements: true });

// Less strict checking (might have false positives)
isReactComponent(something, { strict: false });
```

---

## TypeScript Support

If you're using TypeScript, you get automatic type checking:

```typescript
import { isReactComponent } from 'is-react-comp';

function doSomething(value: unknown) {
  if (isReactComponent(value)) {
    // TypeScript now knows this is a React component!
    return <value />;
  }
}
```

---

## That's it!

No complicated setup, no weird dependencies. Just a simple tool that does one thing well.

**Questions?** [Open an issue](https://github.com/Nikhil012N/is-react-comp/issues)

---

## License

MIT © [Nikhil Kumar](mailto:nikhil012nk@gmail.com)
