/**
 * ExpressionParser - 수식 파서
 * 
 * 사용자 입력 수식을 Math.js가 이해할 수 있는 형식으로 변환하고
 * 수식의 유효성을 검증합니다.
 * 
 * @class
 */
class ExpressionParser {
    /**
     * ExpressionParser 생성자
     */
    constructor() {
        // 연산자 변환 맵
        this.operatorMap = {
            '×': '*',
            '÷': '/',
            '−': '-',
        };

        // 함수 변환 맵
        this.functionMap = {
            'π': 'pi',
            'x²': '^2',
        };

        // 디스플레이용 역변환 맵
        this.displayMap = {
            '*': '×',
            '/': '÷',
            '-': '−',
            'pi': 'π',
            '^2': 'x²',
        };
    }

    /**
     * 사용자 입력 수식을 Math.js 형식으로 변환합니다.
     * 
     * @param {string} expression - 변환할 수식
     * @returns {string} 변환된 수식
     */
    parse(expression) {
        if (!expression || typeof expression !== 'string') {
            return '';
        }

        let result = expression;

        // 공백 제거
        result = result.replace(/\s+/g, '');

        // 연산자 변환 (×, ÷, − → *, /, -)
        Object.keys(this.operatorMap).forEach((key) => {
            result = result.replace(new RegExp(key, 'g'), this.operatorMap[key]);
        });

        // 함수 변환 (π → pi, x² → ^2)
        Object.keys(this.functionMap).forEach((key) => {
            result = result.replace(new RegExp(key, 'g'), this.functionMap[key]);
        });

        // 암시적 곱셈 처리
        result = this.handleImplicitMultiplication(result);

        return result;
    }

    /**
     * 암시적 곱셈을 명시적으로 변환합니다.
     * 예: 2(3) → 2*(3), (2)(3) → (2)*(3), 2sin(30) → 2*sin(30)
     * 
     * @param {string} expression - 수식
     * @returns {string} 변환된 수식
     */
    handleImplicitMultiplication(expression) {
        let result = expression;

        // 숫자와 여는 괄호 사이: 2( → 2*(
        result = result.replace(/(\d)\(/g, '$1*(');

        // 닫는 괄호와 여는 괄호 사이: )( → )*(
        result = result.replace(/\)\(/g, ')*(');

        // 숫자와 함수 사이: 2sin → 2*sin
        result = result.replace(/(\d)(sin|cos|tan|log|ln)/g, '$1*$2');

        return result;
    }

    /**
     * 수식의 유효성을 검증합니다.
     * 
     * @param {string} expression - 검증할 수식
     * @returns {boolean} 유효하면 true, 아니면 false
     */
    validate(expression) {
        if (!expression || typeof expression !== 'string') {
            return false;
        }

        // 빈 문자열 체크
        if (expression.trim() === '') {
            return false;
        }

        // 괄호 균형 검증
        if (!this.validateParentheses(expression)) {
            return false;
        }

        // 연산자 검증
        if (!this.validateOperators(expression)) {
            return false;
        }

        return true;
    }

    /**
     * 괄호의 균형을 검증합니다.
     * 
     * @param {string} expression - 검증할 수식
     * @returns {boolean} 균형이 맞으면 true
     */
    validateParentheses(expression) {
        let count = 0;

        for (const char of expression) {
            if (char === '(') {
                count++;
            } else if (char === ')') {
                count--;
                // 닫는 괄호가 더 많으면 즉시 false
                if (count < 0) {
                    return false;
                }
            }
        }

        // 최종적으로 0이어야 균형
        return count === 0;
    }

    /**
     * 연산자의 유효성을 검증합니다.
     * 
     * @param {string} expression - 검증할 수식
     * @returns {boolean} 유효하면 true
     */
    validateOperators(expression) {
        // 연산자 목록 (-, +는 단항 연산자로도 사용 가능하므로 제외)
        const operators = ['*', '/', '+'];

        // 연속된 연산자 체크 (예: ++, **, //)
        for (const op of operators) {
            if (expression.includes(op + op)) {
                return false;
            }
        }

        // 다른 연산자 조합 체크 (예: +*, -/, etc.)
        const allOps = ['+', '-', '*', '/'];
        for (let i = 0; i < allOps.length; i++) {
            for (let j = 0; j < allOps.length; j++) {
                if (i !== j && expression.includes(allOps[i] + allOps[j])) {
                    return false;
                }
            }
        }

        // 수식 시작이 연산자인지 체크 (단, -는 음수 표현 가능)
        const firstChar = expression.trim()[0];
        if (operators.includes(firstChar)) {
            return false;
        }

        // 수식 끝이 연산자인지 체크
        const lastChar = expression.trim()[expression.trim().length - 1];
        if ([...operators, '-'].includes(lastChar)) {
            return false;
        }

        return true;
    }

    /**
     * 수식을 디스플레이용으로 포맷팅합니다.
     * Math.js 형식을 사용자 친화적 형식으로 변환합니다.
     * 
     * @param {string} expression - 포맷팅할 수식
     * @returns {string} 포맷팅된 수식
     */
    formatForDisplay(expression) {
        if (!expression || typeof expression !== 'string') {
            return '';
        }

        let result = expression;

        // 역변환 (*, /, - → ×, ÷, −)
        // 순서 중요: 긴 패턴부터 먼저 변환
        result = result.replace(/\^2/g, 'x²');
        result = result.replace(/pi/g, 'π');

        Object.keys(this.displayMap).forEach((key) => {
            if (key !== '^2' && key !== 'pi') {
                result = result.replace(new RegExp('\\' + key, 'g'), this.displayMap[key]);
            }
        });

        return result;
    }
}

export default ExpressionParser;
