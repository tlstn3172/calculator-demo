/**
 * Constants - 상수 정의
 */

// 수식 길이 제한
export const MAX_EXPRESSION_LENGTH = 500;

// 소수점 자릿수 제한
export const MAX_DECIMAL_PLACES = 15;

// 과학적 표기법 임계값
export const SCIENTIFIC_THRESHOLD_HIGH = 1e10;
export const SCIENTIFIC_THRESHOLD_LOW = 1e-10;

// 수학 상수
export const MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
};

// 에러 메시지
export const ERROR_MESSAGES = {
    INVALID_NUMBER: 'Invalid number',
    INVALID_EXPRESSION: 'Invalid expression',
    EXPRESSION_TOO_LONG: 'Expression too long',
    DIVISION_BY_ZERO: 'Division by zero',
};
