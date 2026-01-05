import { Parser } from 'expr-eval';

const parser = new Parser({
  operators: {
    logical: false,
    comparison: false,
    in: false,
    assignment: false,
  },
});

const OPERATORS = /[+\-*/]/;

export const normalizeExpression = (prev: string, next: string) => {
  if (!prev) {
    return next;
  }

  const last = prev.at(-1);

  if (OPERATORS.test(last!) && OPERATORS.test(next.at(-1)!)) {
    return prev.slice(0, -1) + next.at(-1);
  }

  return next;
};

export const isExpressionValid = (value: string) => {
  if (!value) {
    return false;
  }

  // no operators at the start
  if (/^[+*/-]/.test(value)) {
    return false;
  }

  // no consecutive operators
  if (/[+\-*/]{2,}/.test(value)) {
    return false;
  }

  // only allowed characters
  if (/[^0-9.+*/-]/.test(value)) {
    return false;
  }

  // validate each number: max 2 decimals
  const numbers = value.split(/[+\-*/]/);
  for (const num of numbers) {
    // disallow multiple leading zeros (except 0. something)
    if (num.length > 1 && num[0] === '0' && !num.startsWith('0.')) {
      return false;
    }

    const parts = num.split('.');
    if (parts[1] && parts[1].length > 2) {
      return false;
    }
  }

  return true;
};

export const evaluateExpression = (value: string): number | null => {
  try {
    const result = parser.evaluate(value);
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

export const shouldShowPreview = (value: string) =>
  /[+\-*/]/.test(value) && isExpressionValid(value);
