import * as ReactIs from 'react-is';
import TestRenderer from 'react-test-renderer';

interface ValidateChildrenProps {
  [key: string]: any;
}

interface AllowedTypes {
  // Primitive types
  string?: boolean; // Default false
  number?: boolean; // Default false

  boolean?: boolean; // Default true
  undefined?: boolean; // Default true
  null?: boolean; // Default true

  // Not implemented primitive types
  // bigint
  // Symbol

  // Advanced types
  fragment?: boolean; // Default false
  function?: boolean; // Default true

  // Component names that are allowed
  // For example - [CardHeader.name, CardContent.name]
  custom?: string[];
}

const createPropTypeError = (name: string, children: any) => {
  const debugInfo = children?._debugSource || children?._owner?._debugSource || children?._source;

  throw new Error(`
      ${name} is not allowed as a child of this component, consult storybook for more information
      \n File name: ${debugInfo?.fileName}
      \n Line number: ${debugInfo?.lineNumber}
  `);
};

const validateTypes = (
  props: ValidateChildrenProps | string | number | boolean | undefined | null,
  isAllowed: AllowedTypes
): any => {
  // Check for primitive types first
  if (typeof props === 'string') {
    return isAllowed.string ? null : createPropTypeError('string', props);
  } else if (typeof props === 'number') {
    return isAllowed.number ? null : createPropTypeError('number', props);
  } else if (typeof props === 'boolean') {
    return isAllowed.boolean ? null : createPropTypeError('boolean', props);
  } else if (props === undefined) {
    return isAllowed.undefined ? null : createPropTypeError('undefined', props);
  } else if (props === null) {
    return isAllowed.null ? null : createPropTypeError('null', props);
  }
  // Check for wrapping functions
  else if (typeof props === 'function') {
    return isAllowed.function
      ? validateTypes((props as any)?.props, isAllowed)
      : createPropTypeError('Functions', props);
  }

  // Children can be an array, in which case loop through and go through the process again
  if (Array.isArray(props)) {
    for (const i of props) {
      validateTypes(i, isAllowed);
    }
    return null;
  }

  // Check if object is an element, if not and it has children, rerun the function
  if (!ReactIs.isElement(props) && 'children' in props) {
    return validateTypes(props['children'], isAllowed);
  }

  // Check for React.fragment
  if (ReactIs.isFragment(props)) {
    return isAllowed.fragment ? validateTypes(props?.props, isAllowed) : createPropTypeError('React.Fragment', props);
  }

  // Check for valid components
  if (isAllowed.custom?.includes(props?.['type']?.displayName || props?.['type']?.name)) {
    return null;
  }

  // Check for invalid components in the file tree, else keep going deeper
  if ('nodeType' in props) {
    // Wrapping components are allowed, so revalidate the children
    if (props?.['nodeType'] === 'component') {
      return validateTypes(props?.['rendered'], isAllowed);
    }

    // nodeType === host. Typically native HTML elements, like div and so on
    return createPropTypeError(props?.['type'], props);
  }

  const errorWithoutExceptions = console.error;
  console.error = () => {
    // Suppress errors from rendering the component tree specifically
  };
  const children = TestRenderer.create(props as any).toTree();
  console.error = errorWithoutExceptions;

  // Validate the component tree
  return validateTypes(children, isAllowed);
};

export const validateChildren = (props: ValidateChildrenProps, allowedTypes: AllowedTypes) => {
  const defaultAllowed: Required<Omit<AllowedTypes, 'custom'>> = {
    string: false,
    number: false,
    boolean: true,
    undefined: true,
    null: true,

    fragment: false,
    function: true,
  };
  const isAllowed = { ...defaultAllowed, ...allowedTypes };

  // Check if props is empty
  if (Object.keys(props).length > 0) {
    validateTypes(props, isAllowed);
  }

  return null;
};
