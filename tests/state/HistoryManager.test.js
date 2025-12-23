import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import HistoryManager from '../../src/scripts/state/HistoryManager.js';

describe('HistoryManager', () => {
    let historyManager;

    beforeEach(() => {
        // LocalStorage mock
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        historyManager = new HistoryManager();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('초기화', () => {
        it('should initialize with empty history', () => {
            expect(historyManager.getHistory()).toEqual([]);
        });
    });

    describe('기록 추가', () => {
        it('should add entry to history', () => {
            historyManager.addEntry('2+3', '5');
            const history = historyManager.getHistory();

            expect(history).toHaveLength(1);
            expect(history[0].expression).toBe('2+3');
            expect(history[0].result).toBe('5');
        });

        it('should add timestamp to entry', () => {
            historyManager.addEntry('2+3', '5');
            const history = historyManager.getHistory();

            expect(history[0].timestamp).toBeDefined();
            expect(typeof history[0].timestamp).toBe('number');
        });

        it('should add multiple entries', () => {
            historyManager.addEntry('2+3', '5');
            historyManager.addEntry('10-7', '3');

            expect(historyManager.getHistory()).toHaveLength(2);
        });

        it('should add new entries at the beginning', () => {
            historyManager.addEntry('2+3', '5');
            historyManager.addEntry('10-7', '3');

            const history = historyManager.getHistory();
            expect(history[0].expression).toBe('10-7');
            expect(history[1].expression).toBe('2+3');
        });
    });

    describe('기록 제한', () => {
        it('should limit history to 50 entries', () => {
            // 51개 추가
            for (let i = 0; i < 51; i++) {
                historyManager.addEntry(`${i}+1`, `${i + 1}`);
            }

            expect(historyManager.getHistory()).toHaveLength(50);
        });

        it('should remove oldest entry when limit exceeded', () => {
            // 51개 추가
            for (let i = 0; i < 51; i++) {
                historyManager.addEntry(`${i}+1`, `${i + 1}`);
            }

            const history = historyManager.getHistory();
            // 가장 오래된 항목 (0+1)은 제거되어야 함
            expect(history[49].expression).toBe('1+1');
        });
    });

    describe('기록 삭제', () => {
        beforeEach(() => {
            historyManager.addEntry('2+3', '5');
            historyManager.addEntry('10-7', '3');
            historyManager.addEntry('4*5', '20');
        });

        it('should remove entry by index', () => {
            historyManager.removeEntry(1);

            const history = historyManager.getHistory();
            expect(history).toHaveLength(2);
            expect(history[0].expression).toBe('4*5');
            expect(history[1].expression).toBe('2+3');
        });

        it('should clear all history', () => {
            historyManager.clearHistory();

            expect(historyManager.getHistory()).toEqual([]);
        });
    });

    describe('기록 재사용', () => {
        beforeEach(() => {
            historyManager.addEntry('2+3', '5');
            historyManager.addEntry('10-7', '3');
        });

        it('should get entry by index', () => {
            const entry = historyManager.getEntry(0);

            expect(entry.expression).toBe('10-7');
            expect(entry.result).toBe('3');
        });

        it('should return null for invalid index', () => {
            expect(historyManager.getEntry(99)).toBeNull();
        });
    });

    describe('LocalStorage 연동', () => {
        it('should save history to localStorage', () => {
            historyManager.addEntry('2+3', '5');
            historyManager.saveHistory();

            expect(global.localStorage.setItem).toHaveBeenCalledWith(
                'calculator-history',
                expect.any(String)
            );
        });

        it('should load history from localStorage', () => {
            const savedHistory = JSON.stringify([
                { expression: '2+3', result: '5', timestamp: Date.now() },
                { expression: '10-7', result: '3', timestamp: Date.now() },
            ]);

            global.localStorage.getItem.mockReturnValue(savedHistory);

            historyManager.loadHistory();

            expect(historyManager.getHistory()).toHaveLength(2);
            expect(historyManager.getHistory()[0].expression).toBe('2+3');
        });

        it('should handle missing localStorage data', () => {
            global.localStorage.getItem.mockReturnValue(null);

            historyManager.loadHistory();

            expect(historyManager.getHistory()).toEqual([]);
        });
    });
});
