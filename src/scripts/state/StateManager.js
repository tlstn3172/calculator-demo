/**
 * StateManager - 상태 관리자
 * 
 * 계산기의 전역 상태를 관리하고 옵저버 패턴을 통해 변경사항을 알립니다.
 * LocalStorage와 연동하여 상태를 영구 저장합니다.
 * 
 * @class
 */
class StateManager {
    /**
     * StateManager 생성자
     */
    constructor() {
        // 초기 상태
        this.state = {
            expression: '',
            result: '0',
            angleMode: 'deg',
        };

        // 리스너 목록 (옵저버 패턴)
        this.listeners = [];
    }

    /**
     * 상태를 업데이트합니다.
     * 
     * @param {Object} newState - 업데이트할 상태 객체
     */
    setState(newState) {
        // 상태 병합
        this.state = {
            ...this.state,
            ...newState,
        };

        // 모든 리스너에게 알림
        this.notifyListeners();
    }

    /**
     * 현재 상태를 반환합니다.
     * 
     * @returns {Object} 현재 상태
     */
    getState() {
        return { ...this.state };
    }

    /**
     * 특정 상태 필드를 반환합니다.
     * 
     * @param {string} key - 상태 키
     * @returns {*} 상태 값
     */
    get(key) {
        return this.state[key];
    }

    /**
     * 상태 변경 리스너를 등록합니다.
     * 
     * @param {Function} listener - 상태 변경 시 호출될 콜백 함수
     */
    subscribe(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }

    /**
     * 상태 변경 리스너를 제거합니다.
     * 
     * @param {Function} listener - 제거할 리스너
     */
    unsubscribe(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    /**
     * 모든 리스너에게 상태 변경을 알립니다.
     */
    notifyListeners() {
        this.listeners.forEach((listener) => {
            listener(this.getState());
        });
    }

    /**
     * 상태를 LocalStorage에 저장합니다.
     */
    saveState() {
        try {
            const stateString = JSON.stringify(this.state);
            localStorage.setItem('calculator-state', stateString);
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    }

    /**
     * LocalStorage에서 상태를 불러옵니다.
     */
    loadState() {
        try {
            const stateString = localStorage.getItem('calculator-state');
            if (stateString) {
                const loadedState = JSON.parse(stateString);
                this.state = {
                    ...this.state,
                    ...loadedState,
                };
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    }
}

export default StateManager;
