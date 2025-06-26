import type { ArgTypes } from "@storybook/angular";

/**
 * Creates argTypes for breakpoints in Storybook.
 * @param typeName The name of the type to be used in the description.
 * @returns An object containing argTypes for each breakpoint.
 *
 * Example usage:
 * ```ts
 * const argTypes = createBreakpointArgTypes("Button");
 * ```
 */
export function createBreakpointArgTypes(typeName: string): ArgTypes {
  const breakpoints = {
    xs: "<576px",
    sm: "≥576px",
    md: "≥768px",
    lg: "≥992px",
    xl: "≥1200px",
    xxl: "≥1400px",
  };

  const result: ArgTypes = {};

  for (const [key, size] of Object.entries(breakpoints)) {
    result[key] = {
      description: `Overrides ${typeName} on ${key} breakpoint (${size}).`,
      table: {
        category: "breakpoints",
        type: { summary: typeName },
      },
    };
  }

  return result;
}
