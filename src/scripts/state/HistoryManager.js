/**
 * HistoryManager - 계산 기록 관리자
 * 
 * 계산 기록을 관리하고 LocalStorage에 저장합니다.
 * 최대 50개의 기록을 유지합니다.
 * 
 * @class
 */
class HistoryManager {
    /**
     * HistoryManager 생성자
     */
    constructor() {
        // 계산 기록 배열
        this.history = [];

        // 최대 기록 개수
        this.maxEntries = 50;
    }

    /**
     * 계산 기록을 추가합니다.
     * 
     * @param {string} expression - 계산 수식
     * @param {string} result - 계산 결과
     */
    addEntry(expression, result) {
        const entry = {
            expression,
            result,
            timestamp: Date.now(),
        };

        // 새 항목을 맨 앞에 추가
        this.history.unshift(entry);

        // 최대 개수 제한
        if (this.history.length > this.maxEntries) {
            this.history.pop();
        }
    }

    /**
     * 전체 기록을 반환합니다.
     * 
     * @returns {Array} 계산 기록 배열
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * 특정 인덱스의 기록을 반환합니다.
     * 
     * @param {number} index - 기록 인덱스
     * @returns {Object|null} 기록 항목 또는 null
     */
    getEntry(index) {
        if (index >= 0 && index < this.history.length) {
            return { ...this.history[index] };
        }
        return null;
    }

    /**
     * 특정 인덱스의 기록을 삭제합니다.
     * 
     * @param {number} index - 삭제할 기록 인덱스
     */
    removeEntry(index) {
        if (index >= 0 && index < this.history.length) {
            this.history.splice(index, 1);
        }
    }

    /**
     * 모든 기록을 삭제합니다.
     */
    clearHistory() {
        this.history = [];
    }

    /**
     * 기록을 LocalStorage에 저장합니다.
     */
    saveHistory() {
        try {
            const historyString = JSON.stringify(this.history);
            localStorage.setItem('calculator-history', historyString);
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    }

    /**
     * LocalStorage에서 기록을 불러옵니다.
     */
    loadHistory() {
        try {
            const historyString = localStorage.getItem('calculator-history');
            if (historyString) {
                this.history = JSON.parse(historyString);
            }
        } catch (error) {
            console.error('Failed to load history:', error);
            this.history = [];
        }
    }
}

export default HistoryManager;
