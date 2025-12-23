import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import StateManager from '../../src/scripts/state/StateManager.js';

describe('StateManager', () => {
    let stateManager;

    beforeEach(() => {
        // LocalStorage mock
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        stateManager = new StateManager();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('초기화', () => {
        it('should initialize with default state', () => {
            const state = stateManager.getState();
            expect(state.expression).toBe('');
            expect(state.result).toBe('0');
            expect(state.angleMode).toBe('deg');
        });
    });

    describe('상태 관리', () => {
        it('should update state with setState', () => {
            stateManager.setState({ expression: '2+3' });
            expect(stateManager.getState().expression).toBe('2+3');
        });

        it('should update multiple fields', () => {
            stateManager.setState({
                expression: '2+3',
                result: '5'
            });
            expect(stateManager.getState().expression).toBe('2+3');
            expect(stateManager.getState().result).toBe('5');
        });

        it('should get specific state field', () => {
            stateManager.setState({ expression: '2+3' });
            expect(stateManager.get('expression')).toBe('2+3');
        });

        it('should preserve other fields when updating', () => {
            stateManager.setState({ expression: '2+3' });
            stateManager.setState({ result: '5' });
            expect(stateManager.getState().expression).toBe('2+3');
            expect(stateManager.getState().result).toBe('5');
        });
    });

    describe('옵저버 패턴', () => {
        it('should notify listeners on state change', () => {
            const listener = vi.fn();
            stateManager.subscribe(listener);

            stateManager.setState({ expression: '2+3' });

            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({ expression: '2+3' })
            );
        });

        it('should support multiple listeners', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();

            stateManager.subscribe(listener1);
            stateManager.subscribe(listener2);

            stateManager.setState({ expression: '2+3' });

            expect(listener1).toHaveBeenCalled();
            expect(listener2).toHaveBeenCalled();
        });

        it('should unsubscribe listener', () => {
            const listener = vi.fn();
            stateManager.subscribe(listener);
            stateManager.unsubscribe(listener);

            stateManager.setState({ expression: '2+3' });

            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe('LocalStorage 연동', () => {
        it('should save state to localStorage', () => {
            stateManager.setState({ expression: '2+3', result: '5' });
            stateManager.saveState();

            expect(global.localStorage.setItem).toHaveBeenCalledWith(
                'calculator-state',
                expect.any(String)
            );
        });

        it('should load state from localStorage', () => {
            const savedState = JSON.stringify({
                expression: '2+3',
                result: '5',
                angleMode: 'rad'
            });

            global.localStorage.getItem.mockReturnValue(savedState);

            stateManager.loadState();

            expect(stateManager.getState().expression).toBe('2+3');
            expect(stateManager.getState().result).toBe('5');
            expect(stateManager.getState().angleMode).toBe('rad');
        });

        it('should handle missing localStorage data', () => {
            global.localStorage.getItem.mockReturnValue(null);

            stateManager.loadState();

            // Should keep default state
            expect(stateManager.getState().expression).toBe('');
        });
    });
});
