import { describe, it, expect } from 'vitest';
import { formatNumber, formatScientific, truncateDecimals } from '../../src/scripts/utils/formatters.js';

describe('Formatters', () => {
    describe('formatNumber', () => {
        it('should format integer', () => {
            expect(formatNumber(123)).toBe('123');
        });

        it('should format decimal', () => {
            expect(formatNumber(123.456)).toBe('123.456');
        });

        it('should format very small number to scientific', () => {
            const result = formatNumber(1e-11);
            expect(result).toContain('e');
        });

        it('should format very large number to scientific', () => {
            const result = formatNumber(1e11);
            expect(result).toContain('e');
        });

        it('should handle zero', () => {
            expect(formatNumber(0)).toBe('0');
        });
    });

    describe('formatScientific', () => {
        it('should format to scientific notation', () => {
            const result = formatScientific(123456789);
            expect(result).toContain('e');
        });

        it('should handle small numbers', () => {
            const result = formatScientific(0.000001);
            expect(result).toContain('e');
        });
    });

    describe('truncateDecimals', () => {
        it('should truncate to specified places', () => {
            const result = truncateDecimals(3.14159265359, 2);
            expect(result).toBe(3.14);
        });

        it('should handle integers', () => {
            const result = truncateDecimals(123, 2);
            expect(result).toBe(123);
        });

        it('should truncate to 15 places by default', () => {
            const longDecimal = 1 / 3; // 0.333...
            const result = truncateDecimals(longDecimal);
            const decimalPlaces = result.toString().split('.')[1]?.length || 0;
            expect(decimalPlaces).toBeLessThanOrEqual(15);
        });
    });
});
