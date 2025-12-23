import { create, all } from 'mathjs';

/**
 * MathEngine - 수학 계산 엔진
 * 
 * Math.js를 활용하여 정밀한 수학 계산을 수행합니다.
 * BigNumber를 사용하여 높은 정밀도를 유지합니다.
 * 
 * @class
 */
class MathEngine {
    /**
     * MathEngine 생성자
     * Math.js 인스턴스를 초기화하고 각도 모드를 설정합니다.
     */
    constructor() {
        // Math.js 인스턴스 생성 (BigNumber 사용, precision 64)
        this.math = create(all, {
            number: 'BigNumber',
            precision: 64,
        });

        // 각도 모드 (deg 또는 rad)
        this.angleMode = 'deg';
    }

    /**
     * 수식을 평가하고 결과를 반환합니다.
     * 
     * @param {string} expression - 평가할 수식
     * @returns {number|string} 계산 결과 또는 에러 메시지
     */
    evaluate(expression) {
        try {
            // 입력 검증
            if (!expression || typeof expression !== 'string') {
                return 'Error: Invalid expression';
            }

            // 빈 문자열 체크
            if (expression.trim() === '') {
                return 'Error: Empty expression';
            }

            // 각도 모드에 따라 수식 조정
            const adjustedExpression = this.adjustForAngleMode(expression);

            // 수식 평가
            const result = this.math.evaluate(adjustedExpression);

            // 결과 포맷팅
            return this.formatResult(result);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * 각도 모드에 따라 수식을 조정합니다.
     * DEG 모드일 경우 삼각함수의 인자를 라디안으로 변환합니다.
     * 
     * @param {string} expression - 원본 수식
     * @returns {string} 조정된 수식
     */
    adjustForAngleMode(expression) {
        // RAD 모드이거나 삼각함수가 없으면 그대로 반환
        if (this.angleMode === 'rad') {
            return expression;
        }

        // DEG 모드: 삼각함수 인자를 라디안으로 변환
        // sin(x) → sin(x * pi / 180)
        // cos(x) → cos(x * pi / 180)
        // tan(x) → tan(x * pi / 180)
        let result = expression;

        // 삼각함수 패턴 매칭 및 변환
        const trigFunctions = ['sin', 'cos', 'tan'];

        trigFunctions.forEach(func => {
            // func(숫자) 패턴을 찾아서 func(숫자 * pi / 180)으로 변환
            const regex = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
            result = result.replace(regex, (match, arg) => {
                return `${func}((${arg}) * pi / 180)`;
            });
        });

        return result;
    }

    /**
     * 계산 결과를 포맷팅합니다.
     * 
     * @param {*} result - Math.js 계산 결과
     * @returns {number} 포맷팅된 숫자 결과
     */
    formatResult(result) {
        // BigNumber를 일반 숫자로 변환
        const numResult = Number(result);

        // Infinity 체크
        if (!isFinite(numResult)) {
            return 'Error: Division by zero';
        }

        return numResult;
    }

    /**
     * 에러를 처리하고 사용자 친화적인 메시지를 반환합니다.
     * 
     * @param {Error} error - 발생한 에러
     * @returns {string} 에러 메시지
     */
    handleError(error) {
        const errorMessage = error.message || error.toString();

        // 0으로 나누기 에러
        if (errorMessage.includes('division by zero') ||
            errorMessage.includes('Infinity')) {
            return 'Error: Division by zero';
        }

        // 구문 에러
        if (errorMessage.includes('Syntax error') ||
            errorMessage.includes('Unexpected')) {
            return 'Error: Invalid expression';
        }

        // 정의되지 않은 변수/함수
        if (errorMessage.includes('Undefined')) {
            return 'Error: Undefined symbol';
        }

        // 기타 에러
        return `Error: ${errorMessage}`;
    }

    /**
     * 각도 모드를 설정합니다.
     * 
     * @param {string} mode - 'deg' 또는 'rad'
     */
    setAngleMode(mode) {
        if (mode === 'deg' || mode === 'rad') {
            this.angleMode = mode;
        } else {
            throw new Error('Invalid angle mode. Use "deg" or "rad".');
        }
    }

    /**
     * 현재 각도 모드를 반환합니다.
     * 
     * @returns {string} 현재 각도 모드 ('deg' 또는 'rad')
     */
    getAngleMode() {
        return this.angleMode;
    }
}

export default MathEngine;
