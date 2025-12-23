import { describe, it, expect, beforeEach } from 'vitest';
import ExpressionParser from '../../src/scripts/calculator/ExpressionParser.js';

describe('ExpressionParser', () => {
    let parser;

    beforeEach(() => {
        parser = new ExpressionParser();
    });

    describe('연산자 변환', () => {
        it('should convert × to *', () => {
            expect(parser.parse('2×3')).toBe('2*3');
        });

        it('should convert ÷ to /', () => {
            expect(parser.parse('10÷2')).toBe('10/2');
        });

        it('should convert − to -', () => {
            expect(parser.parse('5−3')).toBe('5-3');
        });

        it('should convert multiple operators', () => {
            expect(parser.parse('2×3÷4−1')).toBe('2*3/4-1');
        });
    });

    describe('함수 변환', () => {
        it('should convert x² to ^2', () => {
            expect(parser.parse('5x²')).toBe('5^2');
        });

        it('should convert π to pi', () => {
            expect(parser.parse('2×π')).toBe('2*pi');
        });

        it('should keep sin/cos/tan as is', () => {
            expect(parser.parse('sin(30)')).toBe('sin(30)');
            expect(parser.parse('cos(0)')).toBe('cos(0)');
            expect(parser.parse('tan(45)')).toBe('tan(45)');
        });

        it('should keep log/ln as is', () => {
            expect(parser.parse('log(100)')).toBe('log(100)');
            expect(parser.parse('ln(10)')).toBe('ln(10)');
        });
    });

    describe('암시적 곱셈 처리', () => {
        it('should add * between number and parenthesis', () => {
            expect(parser.parse('2(3+4)')).toBe('2*(3+4)');
        });

        it('should add * between parentheses', () => {
            expect(parser.parse('(2+3)(4+5)')).toBe('(2+3)*(4+5)');
        });

        it('should add * between number and function', () => {
            expect(parser.parse('2sin(30)')).toBe('2*sin(30)');
        });
    });

    describe('괄호 검증', () => {
        it('should validate balanced parentheses', () => {
            expect(parser.validate('(2+3)')).toBe(true);
            expect(parser.validate('((2+3)*4)')).toBe(true);
        });

        it('should detect unbalanced opening parenthesis', () => {
            expect(parser.validate('((2+3)')).toBe(false);
        });

        it('should detect unbalanced closing parenthesis', () => {
            expect(parser.validate('(2+3))')).toBe(false);
        });

        it('should validate expression without parentheses', () => {
            expect(parser.validate('2+3')).toBe(true);
        });
    });

    describe('수식 유효성 검증', () => {
        it('should detect consecutive operators', () => {
            expect(parser.validate('2++3')).toBe(false);
            expect(parser.validate('2**3')).toBe(false);
        });

        it('should detect operator at start', () => {
            expect(parser.validate('+2')).toBe(false);
            expect(parser.validate('*3')).toBe(false);
        });

        it('should detect operator at end', () => {
            expect(parser.validate('2+')).toBe(false);
            expect(parser.validate('3*')).toBe(false);
        });

        it('should validate correct expressions', () => {
            expect(parser.validate('2+3')).toBe(true);
            expect(parser.validate('2*3+4')).toBe(true);
        });

        it('should detect empty expression', () => {
            expect(parser.validate('')).toBe(false);
        });
    });

    describe('디스플레이용 포맷팅', () => {
        it('should keep display symbols for UI', () => {
            const formatted = parser.formatForDisplay('2*3/4-1');
            expect(formatted).toBe('2×3÷4−1');
        });

        it('should convert ^ to x²', () => {
            const formatted = parser.formatForDisplay('5^2');
            expect(formatted).toBe('5x²');
        });

        it('should convert pi to π', () => {
            const formatted = parser.formatForDisplay('2*pi');
            expect(formatted).toBe('2×π');
        });
    });

    describe('복잡한 수식 파싱', () => {
        it('should parse complex expression', () => {
            const result = parser.parse('(2+3)×sin(30)÷π');
            expect(result).toBe('(2+3)*sin(30)/pi');
        });

        it('should handle nested functions', () => {
            const result = parser.parse('sin(cos(0))');
            expect(result).toBe('sin(cos(0))');
        });

        it('should handle multiple conversions', () => {
            const result = parser.parse('2×π÷4−1');
            expect(result).toBe('2*pi/4-1');
        });
    });

    describe('엣지 케이스', () => {
        it('should handle spaces', () => {
            expect(parser.parse('2 × 3')).toBe('2*3');
        });

        it('should handle no spaces', () => {
            expect(parser.parse('2×3')).toBe('2*3');
        });

        it('should return empty string for empty input', () => {
            expect(parser.parse('')).toBe('');
        });
    });
});
