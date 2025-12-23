import { describe, it, expect, beforeEach } from 'vitest';
import Calculator from '../../src/scripts/calculator/Calculator.js';
import MathEngine from '../../src/scripts/calculator/MathEngine.js';
import ExpressionParser from '../../src/scripts/calculator/ExpressionParser.js';

describe('Calculator', () => {
    let calculator;
    let mathEngine;
    let expressionParser;

    beforeEach(() => {
        mathEngine = new MathEngine();
        expressionParser = new ExpressionParser();
        calculator = new Calculator(mathEngine, expressionParser);
    });

    describe('의존성 주입', () => {
        it('should accept MathEngine and ExpressionParser via constructor', () => {
            expect(calculator).toBeDefined();
            expect(calculator.mathEngine).toBeDefined();
            expect(calculator.expressionParser).toBeDefined();
        });
    });

    describe('기본 계산 흐름', () => {
        it('should calculate 2×3 correctly', () => {
            const result = calculator.calculate('2×3');
            expect(result).toBe(6);
        });

        it('should calculate 10÷2 correctly', () => {
            const result = calculator.calculate('10÷2');
            expect(result).toBe(5);
        });

        it('should calculate 5−3 correctly', () => {
            const result = calculator.calculate('5−3');
            expect(result).toBe(2);
        });

        it('should calculate with π', () => {
            const result = calculator.calculate('2×π');
            expect(result).toBeCloseTo(6.283185, 5);
        });
    });

    describe('복잡한 수식', () => {
        it('should calculate (2+3)×4', () => {
            const result = calculator.calculate('(2+3)×4');
            expect(result).toBe(20);
        });

        it('should calculate nested parentheses', () => {
            const result = calculator.calculate('((2+3)×4)−5');
            expect(result).toBe(15);
        });

        it('should handle operator precedence', () => {
            const result = calculator.calculate('2+3×4');
            expect(result).toBe(14);
        });
    });

    describe('삼각함수 통합', () => {
        it('should calculate sin(30) in DEG mode', () => {
            expect(calculator.getAngleMode()).toBe('deg');
            const result = calculator.calculate('sin(30)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate cos(60) in DEG mode', () => {
            const result = calculator.calculate('cos(60)');
            expect(result).toBeCloseTo(0.5, 10);
        });

        it('should calculate in RAD mode after switching', () => {
            calculator.setAngleMode('rad');
            const result = calculator.calculate('sin(pi/6)');
            expect(result).toBeCloseTo(0.5, 10);
        });
    });

    describe('각도 모드 관리', () => {
        it('should have DEG as default', () => {
            expect(calculator.getAngleMode()).toBe('deg');
        });

        it('should allow setting angle mode', () => {
            calculator.setAngleMode('rad');
            expect(calculator.getAngleMode()).toBe('rad');
        });

        it('should propagate angle mode to MathEngine', () => {
            calculator.setAngleMode('rad');
            expect(mathEngine.getAngleMode()).toBe('rad');
        });
    });

    describe('에러 처리', () => {
        it('should handle invalid expression', () => {
            const result = calculator.calculate('2++3');
            expect(result).toContain('Error');
        });

        it('should handle unbalanced parentheses', () => {
            const result = calculator.calculate('(2+3');
            expect(result).toContain('Error');
        });

        it('should handle division by zero', () => {
            const result = calculator.calculate('5÷0');
            expect(result).toContain('Error');
            expect(result).toContain('Division by zero');
        });

        it('should handle empty expression', () => {
            const result = calculator.calculate('');
            expect(result).toContain('Error');
        });
    });

    describe('통합 시나리오', () => {
        it('should handle complex scientific expression', () => {
            const result = calculator.calculate('(12+5)×sin(30)');
            expect(result).toBeCloseTo(8.5, 10);
        });

        it('should handle expression with π and trigonometry', () => {
            calculator.setAngleMode('rad');
            const result = calculator.calculate('2×π×cos(0)');
            expect(result).toBeCloseTo(6.283185, 5);
        });
    });
});
