/**
 * Calculator - 계산기 메인 클래스
 * 
 * MathEngine과 ExpressionParser를 통합하여 계산 흐름을 조율합니다.
 * 의존성 주입(Dependency Injection)을 통해 SOLID 원칙을 준수합니다.
 * 
 * @class
 */
class Calculator {
    /**
     * Calculator 생성자
     * 
     * @param {MathEngine} mathEngine - 수학 계산 엔진
     * @param {ExpressionParser} expressionParser - 수식 파서
     */
    constructor(mathEngine, expressionParser) {
        if (!mathEngine || !expressionParser) {
            throw new Error('MathEngine and ExpressionParser are required');
        }

        this.mathEngine = mathEngine;
        this.expressionParser = expressionParser;
    }

    /**
     * 수식을 계산하고 결과를 반환합니다.
     * 
     * 계산 흐름:
     * 1. ExpressionParser로 수식 검증
     * 2. ExpressionParser로 수식 파싱 (연산자/함수 변환)
     * 3. MathEngine으로 계산 실행
     * 4. 결과 반환
     * 
     * @param {string} expression - 계산할 수식
     * @returns {number|string} 계산 결과 또는 에러 메시지
     */
    calculate(expression) {
        try {
            // 1. 수식 유효성 검증
            if (!this.expressionParser.validate(expression)) {
                return 'Error: Invalid expression';
            }

            // 2. 수식 파싱 (연산자/함수 변환)
            const parsedExpression = this.expressionParser.parse(expression);

            // 3. 계산 실행
            const result = this.mathEngine.evaluate(parsedExpression);

            // 4. 결과 반환
            return result;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    /**
     * 각도 모드를 설정합니다.
     * MathEngine의 각도 모드를 변경합니다.
     * 
     * @param {string} mode - 'deg' 또는 'rad'
     */
    setAngleMode(mode) {
        this.mathEngine.setAngleMode(mode);
    }

    /**
     * 현재 각도 모드를 반환합니다.
     * 
     * @returns {string} 현재 각도 모드 ('deg' 또는 'rad')
     */
    getAngleMode() {
        return this.mathEngine.getAngleMode();
    }
}

export default Calculator;
