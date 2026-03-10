// Test file for all component examples and their properties
import React from 'react';
import {
  isReactComponent,
  getReactComponentInfo,
  isFunctionComponent,
  isClassComponent,
  isMemoComponent,
  isForwardRefComponent,
  isLazyComponent,
  isReactElement,
  withComponentValidation,
  useIsComponent
} from './index.js';

console.log('🧪 Testing is-react-comp examples...\n');

// 1. Function Component Test
function MyButton({ text }) {
  return React.createElement('button', null, text);
}

console.log('1. Function Component Tests:');
console.log('isReactComponent(MyButton):', isReactComponent(MyButton));
console.log('isFunctionComponent(MyButton):', isFunctionComponent(MyButton));
console.log('getReactComponentInfo(MyButton):', getReactComponentInfo(MyButton));
console.log('');

// 2. Class Component Test
class MyCounter extends React.Component {
  render() {
    return React.createElement('div', null, `Count: ${this.props.count}`);
  }
}

console.log('2. Class Component Tests:');
console.log('isReactComponent(MyCounter):', isReactComponent(MyCounter));
console.log('isClassComponent(MyCounter):', isClassComponent(MyCounter));
console.log('getReactComponentInfo(MyCounter):', getReactComponentInfo(MyCounter));
console.log('');

// 3. Memo Component Test
const ExpensiveComponent = React.memo(function({ data }) {
  return React.createElement('div', null, 
    data.map(item => React.createElement('span', { key: item.id }, item.name))
  );
});

console.log('3. Memo Component Tests:');
console.log('isReactComponent(ExpensiveComponent):', isReactComponent(ExpensiveComponent));
console.log('isMemoComponent(ExpensiveComponent):', isMemoComponent(ExpensiveComponent));
console.log('getReactComponentInfo(ExpensiveComponent):', getReactComponentInfo(ExpensiveComponent));
console.log('');

// 4. ForwardRef Component Test
const MyInput = React.forwardRef((props, ref) => {
  return React.createElement('input', { ref, ...props });
});

console.log('4. ForwardRef Component Tests:');
console.log('isReactComponent(MyInput):', isReactComponent(MyInput));
console.log('isForwardRefComponent(MyInput):', isForwardRefComponent(MyInput));
console.log('getReactComponentInfo(MyInput):', getReactComponentInfo(MyInput));
console.log('');

// 5. Lazy Component Test
// Note: In a real test, this would import an actual component
const MockLazyComponent = React.lazy(() => Promise.resolve({
  default: () => React.createElement('div', null, 'Lazy loaded content')
}));

console.log('5. Lazy Component Tests:');
console.log('isReactComponent(MockLazyComponent):', isReactComponent(MockLazyComponent));
console.log('isLazyComponent(MockLazyComponent):', isLazyComponent(MockLazyComponent));
console.log('getReactComponentInfo(MockLazyComponent):', getReactComponentInfo(MockLazyComponent));
console.log('');

// 6. React Elements Test
const element = React.createElement('div', null, 'Hello World');
const component = function() { return React.createElement('div', null, 'Hello'); };

console.log('6. React Element Tests:');
console.log('isReactElement(element):', isReactElement(element));
console.log('isReactElement(component):', isReactElement(component));
console.log('isReactComponent(element):', isReactComponent(element));
console.log('isReactComponent(element, { includeElements: true }):', isReactComponent(element, { includeElements: true }));
console.log('isReactComponent(component, { includeElements: true }):', isReactComponent(component, { includeElements: true }));
console.log('');

// 7. Invalid Components Test
const invalidValues = [
  null,
  undefined,
  'string',
  42,
  {},
  [],
  true,
  false,
  function regularFunction() { return 'not a component'; }
];

console.log('7. Invalid Components Tests:');
invalidValues.forEach((value, index) => {
  console.log(`Test ${index + 1} - Value:`, typeof value, value);
  console.log('isReactComponent:', isReactComponent(value));
  console.log('getReactComponentInfo:', getReactComponentInfo(value));
  console.log('');
});

// 8. withComponentValidation Tests
function UserProfile({ user }) {
  return React.createElement('div', null, [
    React.createElement('h2', null, user.name),
    React.createElement('p', null, user.email)
  ]);
}

const SafeUserProfile = withComponentValidation(UserProfile, {
  fallback: React.createElement('div', { className: 'error' }, 'Failed to load user profile'),
  strict: true
});

console.log('8. withComponentValidation Tests:');
console.log('SafeUserProfile created successfully:', typeof SafeUserProfile === 'function');
console.log('isReactComponent(SafeUserProfile):', isReactComponent(SafeUserProfile));
console.log('getReactComponentInfo(SafeUserProfile):', getReactComponentInfo(SafeUserProfile));

// Test with invalid component
const SafeInvalidComponent = withComponentValidation(null, {
  fallback: React.createElement('div', null, 'Invalid component')
});

console.log('SafeInvalidComponent created:', typeof SafeInvalidComponent === 'function');
console.log('');

// 9. Options Testing
console.log('9. Options Testing:');
console.log('Strict mode vs non-strict:');
console.log('isReactComponent(MyButton, { strict: true }):', isReactComponent(MyButton, { strict: true }));
console.log('isReactComponent(MyButton, { strict: false }):', isReactComponent(MyButton, { strict: false }));
console.log('isReactComponent(MyButton, { includeElements: true }):', isReactComponent(MyButton, { includeElements: true }));
console.log('');

// 10. Edge Cases
console.log('10. Edge Cases:');

// Component with no name
const AnonymousComponent = () => React.createElement('div', null, 'Anonymous');
console.log('Anonymous component info:', getReactComponentInfo(AnonymousComponent));

// Component with displayName
AnonymousComponent.displayName = 'CustomName';
console.log('Component with custom displayName:', getReactComponentInfo(AnonymousComponent));

// Arrow function component
const ArrowComponent = ({ text }) => React.createElement('span', null, text);
console.log('Arrow component:', getReactComponentInfo(ArrowComponent));

console.log('\n✅ All tests completed!');
