import { describe, it, expect } from 'vitest';
import { isValidNumber, isValidExpression, hasMaxLength } from '../../src/scripts/utils/validators.js';

describe('Validators', () => {
    describe('isValidNumber', () => {
        it('should validate integer', () => {
            expect(isValidNumber('123')).toBe(true);
        });

        it('should validate decimal', () => {
            expect(isValidNumber('123.456')).toBe(true);
        });

        it('should validate negative number', () => {
            expect(isValidNumber('-123')).toBe(true);
        });

        it('should reject invalid number', () => {
            expect(isValidNumber('abc')).toBe(false);
        });

        it('should reject empty string', () => {
            expect(isValidNumber('')).toBe(false);
        });

        it('should validate scientific notation', () => {
            expect(isValidNumber('1e10')).toBe(true);
            expect(isValidNumber('1.5e-5')).toBe(true);
        });
    });

    describe('isValidExpression', () => {
        it('should validate simple expression', () => {
            expect(isValidExpression('2+3')).toBe(true);
        });

        it('should validate complex expression', () => {
            expect(isValidExpression('(2+3)*4')).toBe(true);
        });

        it('should reject empty expression', () => {
            expect(isValidExpression('')).toBe(false);
        });

        it('should reject null/undefined', () => {
            expect(isValidExpression(null)).toBe(false);
            expect(isValidExpression(undefined)).toBe(false);
        });
    });

    describe('hasMaxLength', () => {
        it('should accept expression within limit', () => {
            expect(hasMaxLength('2+3')).toBe(true);
        });

        it('should reject expression exceeding limit', () => {
            const longExpression = '1'.repeat(501);
            expect(hasMaxLength(longExpression)).toBe(false);
        });

        it('should accept expression at limit', () => {
            const maxExpression = '1'.repeat(500);
            expect(hasMaxLength(maxExpression)).toBe(true);
        });
    });
});
