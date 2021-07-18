/**
 * global String 을 확장합니다.
 */
declare global {
  interface String {
    toSnakeCase(): string;

    toCamelCase(): string;

    splitWords(): string[];

    quote(): string;
  }
}

/**
 *
 */
String.prototype.toSnakeCase = function (): string {
  return String(this)
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_');
};

/**
 *
 */
String.prototype.toCamelCase = function (): string {
  return String(this).replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
};

/**
 *
 */
String.prototype.splitWords = function (): string[] {
  return String(this)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ');
};

/**
 *
 */
String.prototype.quote = function (): string {
  if (!this) {
    return null;
  }

  return `'${String(this)}'`;
};

export {};
