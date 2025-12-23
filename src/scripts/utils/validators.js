import { MAX_EXPRESSION_LENGTH } from './constants.js';

/**
 * 숫자 유효성을 검증합니다.
 * 
 * @param {string} value - 검증할 값
 * @returns {boolean} 유효하면 true
 */
export function isValidNumber(value) {
    if (!value || typeof value !== 'string') {
        return false;
    }

    // 빈 문자열 체크
    if (value.trim() === '') {
        return false;
    }

    // 숫자로 변환 가능한지 확인
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
}

/**
 * 수식 유효성을 검증합니다.
 * 
 * @param {string} expression - 검증할 수식
 * @returns {boolean} 유효하면 true
 */
export function isValidExpression(expression) {
    if (!expression || typeof expression !== 'string') {
        return false;
    }

    // 빈 문자열 체크
    if (expression.trim() === '') {
        return false;
    }

    return true;
}

/**
 * 수식 길이가 최대 길이 이내인지 확인합니다.
 * 
 * @param {string} expression - 확인할 수식
 * @returns {boolean} 길이가 제한 이내면 true
 */
export function hasMaxLength(expression) {
    if (!expression || typeof expression !== 'string') {
        return true;
    }

    return expression.length <= MAX_EXPRESSION_LENGTH;
}
