/**
 * ButtonHandler - 버튼 이벤트 핸들러
 * 
 * 계산기 버튼 클릭 및 키보드 입력을 처리합니다.
 * 
 * @class
 */
class ButtonHandler {
    /**
     * ButtonHandler 생성자
     * 
     * @param {Calculator} calculator - 계산기 인스턴스
     * @param {ExpressionParser} expressionParser - 수식 파서
     * @param {StateManager} stateManager - 상태 관리자
     * @param {HistoryManager} historyManager - 기록 관리자
     */
    constructor(calculator, expressionParser, stateManager, historyManager) {
        this.calculator = calculator;
        this.expressionParser = expressionParser;
        this.stateManager = stateManager;
        this.historyManager = historyManager;

        this.currentExpression = '';

        this.init();
    }

    /**
     * 이벤트 리스너를 초기화합니다.
     */
    init() {
        // 숫자 버튼
        document.querySelectorAll('.btn-number').forEach((btn) => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.number;
                this.handleNumber(value);
            });
        });

        // 연산자 버튼
        document.querySelectorAll('.btn-operator').forEach((btn) => {
            btn.addEventListener('click', () => {
                const operator = btn.dataset.operator;
                this.handleOperator(operator);
            });
        });

        // 함수 버튼
        document.querySelectorAll('.btn-function').forEach((btn) => {
            btn.addEventListener('click', () => {
                const func = btn.dataset.function;
                this.handleFunction(func);
            });
        });

        // 유틸리티 버튼
        document.querySelectorAll('.btn-utility').forEach((btn) => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleUtility(action);
            });
        });

        // = 버튼
        document.querySelectorAll('.btn-equals').forEach((btn) => {
            btn.addEventListener('click', () => this.handleEquals());
        });

        // 키보드 이벤트
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * 숫자 입력을 처리합니다.
     * 
     * @param {string} number - 입력된 숫자
     */
    handleNumber(number) {
        this.currentExpression += number;
        this.updateState();
    }

    /**
     * 연산자 입력을 처리합니다.
     * 
     * @param {string} operator - 입력된 연산자
     */
    handleOperator(operator) {
        // 디스플레이용 연산자로 변환
        const displayOperator = this.getDisplayOperator(operator);
        this.currentExpression += displayOperator;
        this.updateState();
    }

    /**
     * 함수 입력을 처리합니다.
     * 
     * @param {string} func - 입력된 함수
     */
    handleFunction(func) {
        switch (func) {
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
                this.currentExpression += `${func}(`;
                break;
            case 'square':
                this.currentExpression += 'x²';
                break;
            case 'pi':
                this.currentExpression += 'π';
                break;
            case 'deg':
                this.toggleAngleMode();
                return;
            case '(':
            case ')':
                this.currentExpression += func;
                break;
        }
        this.updateState();
    }

    /**
     * 유틸리티 버튼을 처리합니다.
     * 
     * @param {string} action - 액션 타입
     */
    handleUtility(action) {
        switch (action) {
            case 'clear':
                this.handleClear();
                break;
            case 'backspace':
                this.handleBackspace();
                break;
            case 'ans':
                this.handleAns();
                break;
        }
    }

    /**
     * = 버튼을 처리합니다.
     */
    handleEquals() {
        if (!this.currentExpression) return;

        const result = this.calculator.calculate(this.currentExpression);

        // 에러 체크
        if (typeof result === 'string' && result.includes('Error')) {
            this.stateManager.setState({ result });
            return;
        }

        // 기록 추가
        this.historyManager.addEntry(this.currentExpression, String(result));
        this.historyManager.saveHistory();

        // 상태 업데이트
        this.stateManager.setState({
            expression: this.currentExpression,
            result: String(result),
        });
        this.stateManager.saveState();

        // 다음 계산을 위해 초기화
        this.currentExpression = '';
    }

    /**
     * AC (전체 삭제) 버튼을 처리합니다.
     */
    handleClear() {
        this.currentExpression = '';
        this.stateManager.setState({
            expression: '',
            result: '0',
        });
    }

    /**
     * Backspace (마지막 문자 삭제) 버튼을 처리합니다.
     */
    handleBackspace() {
        this.currentExpression = this.currentExpression.slice(0, -1);
        this.updateState();
    }

    /**
     * ANS (이전 결과 재사용) 버튼을 처리합니다.
     */
    handleAns() {
        const lastResult = this.stateManager.get('result');
        if (lastResult && lastResult !== '0') {
            this.currentExpression += lastResult;
            this.updateState();
        }
    }

    /**
     * 각도 모드를 토글합니다.
     */
    toggleAngleMode() {
        const currentMode = this.calculator.getAngleMode();
        const newMode = currentMode === 'deg' ? 'rad' : 'deg';
        this.calculator.setAngleMode(newMode);
        this.stateManager.setState({ angleMode: newMode });

        // 버튼 텍스트 업데이트
        const degBtn = document.querySelector('[data-function="deg"]');
        if (degBtn) {
            degBtn.textContent = newMode.toUpperCase();
        }
    }

    /**
     * 키보드 입력을 처리합니다.
     * 
     * @param {KeyboardEvent} e - 키보드 이벤트
     */
    handleKeyboard(e) {
        // 숫자
        if (e.key >= '0' && e.key <= '9') {
            this.handleNumber(e.key);
        }
        // 연산자
        else if (e.key === '+') {
            this.handleOperator('+');
        } else if (e.key === '-') {
            this.handleOperator('-');
        } else if (e.key === '*') {
            this.handleOperator('*');
        } else if (e.key === '/') {
            e.preventDefault();
            this.handleOperator('/');
        }
        // 소수점
        else if (e.key === '.') {
            this.handleNumber('.');
        }
        // Enter (=)
        else if (e.key === 'Enter') {
            e.preventDefault();
            this.handleEquals();
        }
        // Escape (AC)
        else if (e.key === 'Escape') {
            this.handleClear();
        }
        // Backspace
        else if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleBackspace();
        }
    }

    /**
     * 상태를 업데이트합니다.
     */
    updateState() {
        this.stateManager.setState({
            expression: this.currentExpression || '0',
            result: '0',
        });
    }

    /**
     * 디스플레이용 연산자를 반환합니다.
     * 
     * @param {string} operator - 연산자
     * @returns {string} 디스플레이용 연산자
     */
    getDisplayOperator(operator) {
        const map = {
            '*': '×',
            '/': '÷',
            '-': '−',
            '+': '+',
            '%': '%',
        };
        return map[operator] || operator;
    }
}

export default ButtonHandler;
