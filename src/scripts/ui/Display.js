/**
 * Display - 디스플레이 컨트롤러
 * 
 * 계산기 화면 표시를 관리합니다.
 * StateManager와 연동하여 상태 변경 시 화면을 업데이트합니다.
 * 
 * @class
 */
class Display {
    /**
     * Display 생성자
     * 
     * @param {StateManager} stateManager - 상태 관리자
     */
    constructor(stateManager) {
        this.stateManager = stateManager;

        // DOM 요소
        this.expressionEl = document.getElementById('expression');
        this.resultEl = document.getElementById('result');
        this.historyHintEl = document.getElementById('history-hint');

        // StateManager 구독
        this.stateManager.subscribe(this.onStateChange.bind(this));

        // 초기 상태 표시
        this.render();
    }

    /**
     * 상태 변경 시 호출되는 콜백
     * 
     * @param {Object} state - 새로운 상태
     */
    onStateChange(state) {
        this.render();
    }

    /**
     * 화면을 렌더링합니다.
     */
    render() {
        const state = this.stateManager.getState();
        this.updateExpression(state.expression || '0');
        this.updateResult(state.result || '0');
    }

    /**
     * 수식 표시를 업데이트합니다.
     * 
     * @param {string} expression - 표시할 수식
     */
    updateExpression(expression) {
        if (this.expressionEl) {
            this.expressionEl.textContent = expression || '0';
            this.scrollToEnd(this.expressionEl);
        }
    }

    /**
     * 결과 표시를 업데이트합니다.
     * 
     * @param {string} result - 표시할 결과
     */
    updateResult(result) {
        if (this.resultEl) {
            this.resultEl.textContent = result || '0';
            this.scrollToEnd(this.resultEl);
        }
    }

    /**
     * 에러 메시지를 표시합니다.
     * 
     * @param {string} message - 에러 메시지
     */
    showError(message) {
        if (this.resultEl) {
            this.resultEl.textContent = message;
            this.resultEl.style.color = '#ef4444';

            // 2초 후 색상 복원
            setTimeout(() => {
                this.resultEl.style.color = '';
            }, 2000);
        }
    }

    /**
     * 계산 기록 힌트를 업데이트합니다.
     * 
     * @param {Array} history - 계산 기록 배열
     */
    updateHistory(history) {
        if (this.historyHintEl && history.length > 0) {
            const recentEntries = history.slice(0, 2);
            this.historyHintEl.innerHTML = recentEntries
                .map((entry) => `<div class="opacity-60">${entry.expression} = ${entry.result}</div>`)
                .join('');
        }
    }

    /**
     * 요소를 끝까지 스크롤합니다.
     * 
     * @param {HTMLElement} element - 스크롤할 요소
     */
    scrollToEnd(element) {
        if (element) {
            element.scrollLeft = element.scrollWidth;
        }
    }
}

export default Display;
