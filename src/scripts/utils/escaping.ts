export function isSpecialChar(value: string): boolean {
  return ["\\", "*"].includes(value);
}

export function escapedChar(value: string): string {
  if (isSpecialChar(value)) {
    return `\\${value}`;
  }

  return value;
}
