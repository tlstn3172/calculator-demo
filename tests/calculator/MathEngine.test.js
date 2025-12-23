import { describe, it, expect, beforeEach } from 'vitest';
import MathEngine from '../../src/scripts/calculator/MathEngine.js';

describe('MathEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new MathEngine();
    });

    describe('기본 사칙연산', () => {
        it('should add two numbers correctly', () => {
            expect(engine.evaluate('2 + 3')).toBe(5);
        });

        it('should subtract two numbers correctly', () => {
            expect(engine.evaluate('10 - 7')).toBe(3);
        });

        it('should multiply two numbers correctly', () => {
            expect(engine.evaluate('4 * 5')).toBe(20);
        });

        it('should divide two numbers correctly', () => {
            expect(engine.evaluate('15 / 3')).toBe(5);
        });
    });

    describe('소수점 계산', () => {
        it('should handle decimal addition', () => {
            expect(engine.evaluate('2.5 + 3.7')).toBeCloseTo(6.2, 10);
        });

        it('should handle decimal subtraction', () => {
            expect(engine.evaluate('10.5 - 3.2')).toBeCloseTo(7.3, 10);
        });

        it('should handle decimal multiplication', () => {
            expect(engine.evaluate('2.5 * 4')).toBe(10);
        });

        it('should handle decimal division', () => {
            expect(engine.evaluate('7.5 / 2.5')).toBe(3);
        });
    });

    describe('에러 처리', () => {
        it('should handle division by zero', () => {
            const result = engine.evaluate('5 / 0');
            expect(result).toContain('Error');
            expect(result).toContain('Division by zero');
        });

        it('should handle invalid expression', () => {
            const result = engine.evaluate('2 + + 3');
            expect(result).toContain('Error');
        });

        it('should handle empty expression', () => {
            const result = engine.evaluate('');
            expect(result).toContain('Error');
        });

        it('should handle undefined expression', () => {
            const result = engine.evaluate(undefined);
            expect(result).toContain('Error');
        });
    });

    describe('큰 수 / 작은 수', () => {
        it('should handle very large numbers', () => {
            expect(engine.evaluate('1e10 + 1e10')).toBe(2e10);
        });

        it('should handle very small numbers', () => {
            expect(engine.evaluate('1e-10 * 2')).toBeCloseTo(2e-10, 15);
        });

        it('should handle scientific notation', () => {
            expect(engine.evaluate('1.5e5 + 5e4')).toBe(200000);
        });
    });

    describe('복잡한 수식', () => {
        it('should handle parentheses', () => {
            expect(engine.evaluate('(2 + 3) * 4')).toBe(20);
        });

        it('should handle nested parentheses', () => {
            expect(engine.evaluate('((2 + 3) * 4) - 5')).toBe(15);
        });

        it('should handle operator precedence', () => {
            expect(engine.evaluate('2 + 3 * 4')).toBe(14);
        });
    });

    describe('각도 모드', () => {
        it('should have DEG as default angle mode', () => {
            expect(engine.getAngleMode()).toBe('deg');
        });

        it('should allow setting angle mode to RAD', () => {
            engine.setAngleMode('rad');
            expect(engine.getAngleMode()).toBe('rad');
        });

        it('should allow setting angle mode to DEG', () => {
            engine.setAngleMode('rad');
            engine.setAngleMode('deg');
            expect(engine.getAngleMode()).toBe('deg');
        });
    });

    describe('삼각함수 (DEG 모드)', () => {
        it('should calculate sin(30) correctly in DEG mode', () => {
            expect(engine.getAngleMode()).toBe('deg');
            const result = engine.evaluate('sin(30)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate cos(60) correctly in DEG mode', () => {
            const result = engine.evaluate('cos(60)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate tan(45) correctly in DEG mode', () => {
            const result = engine.evaluate('tan(45)');
            expect(result).toBeCloseTo(1, 10);
        });

        it('should calculate cos(0) correctly in DEG mode', () => {
            const result = engine.evaluate('cos(0)');
            expect(result).toBe(1);
        });
    });

    describe('삼각함수 (RAD 모드)', () => {
        beforeEach(() => {
            engine.setAngleMode('rad');
        });

        it('should calculate sin(pi/6) correctly in RAD mode', () => {
            const result = engine.evaluate('sin(pi/6)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate cos(pi/3) correctly in RAD mode', () => {
            const result = engine.evaluate('cos(pi/3)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate tan(pi/4) correctly in RAD mode', () => {
            const result = engine.evaluate('tan(pi/4)');
            expect(result).toBeCloseTo(1, 10);
        });

        it('should calculate cos(0) correctly in RAD mode', () => {
            const result = engine.evaluate('cos(0)');
            expect(result).toBe(1);
        });
    });

    describe('결과 포맷팅', () => {
        it('should format integer results', () => {
            expect(engine.evaluate('2 + 3')).toBe(5);
        });

        it('should format decimal results', () => {
            const result = engine.evaluate('1 / 3');
            expect(typeof result).toBe('number');
            expect(result).toBeCloseTo(0.333333, 5);
        });

        it('should handle very long decimal results', () => {
            const result = engine.evaluate('1 / 7');
            expect(typeof result).toBe('number');
        });
    });
});
