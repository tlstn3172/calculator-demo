import { MAX_DECIMAL_PLACES, SCIENTIFIC_THRESHOLD_HIGH, SCIENTIFIC_THRESHOLD_LOW } from './constants.js';

/**
 * 숫자를 포맷팅합니다.
 * 
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 포맷팅된 문자열
 */
export function formatNumber(num) {
    if (num === 0) {
        return '0';
    }

    // 과학적 표기법이 필요한 경우
    if (Math.abs(num) >= SCIENTIFIC_THRESHOLD_HIGH ||
        (Math.abs(num) < SCIENTIFIC_THRESHOLD_LOW && num !== 0)) {
        return formatScientific(num);
    }

    // 일반 숫자
    return String(num);
}

/**
 * 숫자를 과학적 표기법으로 포맷팅합니다.
 * 
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 과학적 표기법 문자열
 */
export function formatScientific(num) {
    return num.toExponential();
}

/**
 * 소수점 자릿수를 제한합니다.
 * 
 * @param {number} num - 숫자
 * @param {number} places - 소수점 자릿수 (기본값: 15)
 * @returns {number} 제한된 숫자
 */
export function truncateDecimals(num, places = MAX_DECIMAL_PLACES) {
    const multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
