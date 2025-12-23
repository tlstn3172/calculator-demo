# TDD (Test-Driven Development) 규칙

## 개요
이 프로젝트의 **코어 로직**은 반드시 TDD(Test-Driven Development) 방식으로 구현합니다.
UI 컴포넌트는 TDD 대상에서 제외되지만, UI와 분리된 비즈니스 로직은 TDD를 적용합니다.

## TDD 적용 범위

### ✅ TDD 필수 적용 (코어 로직)
- `scripts/calculator/` - 계산 엔진 및 로직
  - `MathEngine.js` - 수학 계산 엔진
  - `ExpressionParser.js` - 수식 파싱
  - `Calculator.js` - 계산기 메인 로직
  - `AngleMode.js` - 각도 모드 관리
- `scripts/state/` - 상태 관리
  - `StateManager.js` - 상태 관리 로직
  - `HistoryManager.js` - 계산 기록 관리
- `scripts/utils/` - 유틸리티 함수
  - `validators.js` - 입력 검증
  - `formatters.js` - 결과 포맷팅
  - `constants.js` - 상수 (테스트 불필요)

### ⚠️ TDD 선택 적용 (UI 로직)
- `scripts/ui/` - UI 컨트롤러
  - `Display.js` - 디스플레이 로직 (선택)
  - `ButtonHandler.js` - 이벤트 핸들러 (선택)
  - `ThemeManager.js` - 테마 관리 (선택)

### ❌ TDD 제외
- HTML 파일
- CSS 파일
- 설정 파일 (vite.config.js, tailwind.config.js 등)

## TDD 사이클 (Red-Green-Refactor)

### 1️⃣ Red: 실패하는 테스트 작성
```javascript
// tests/calculator/MathEngine.test.js
import { describe, it, expect } from 'vitest';
import MathEngine from '../../src/scripts/calculator/MathEngine.js';

describe('MathEngine', () => {
  it('should add two numbers', () => {
    const engine = new MathEngine();
    expect(engine.evaluate('2 + 3')).toBe(5);
  });
});
```

**실행 결과**: ❌ FAIL (MathEngine 클래스가 아직 없음)

### 2️⃣ Green: 테스트를 통과하는 최소한의 코드 작성
```javascript
// src/scripts/calculator/MathEngine.js
class MathEngine {
  evaluate(expression) {
    // 최소한의 구현
    return eval(expression);
  }
}

export default MathEngine;
```

**실행 결과**: ✅ PASS

### 3️⃣ Refactor: 코드 개선
```javascript
// src/scripts/calculator/MathEngine.js
import { create, all } from 'mathjs';

class MathEngine {
  constructor() {
    this.math = create(all, {
      number: 'BigNumber',
      precision: 64,
    });
  }
  
  evaluate(expression) {
    try {
      const result = this.math.evaluate(expression);
      return Number(result);
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }
}

export default MathEngine;
```

**실행 결과**: ✅ PASS (리팩토링 후에도 테스트 통과)

## 구현 순서

### 1단계: 테스트 파일 생성
```bash
# 테스트 파일 먼저 생성
tests/calculator/MathEngine.test.js
```

### 2단계: 테스트 케이스 작성
```javascript
describe('MathEngine', () => {
  describe('기본 연산', () => {
    it('덧셈 계산', () => {
      const engine = new MathEngine();
      expect(engine.evaluate('2 + 3')).toBe(5);
    });
    
    it('뺄셈 계산', () => {
      const engine = new MathEngine();
      expect(engine.evaluate('10 - 7')).toBe(3);
    });
  });
});
```

### 3단계: 테스트 실행 (실패 확인)
```bash
npm run test
# ❌ FAIL: MathEngine is not defined
```

### 4단계: 구현 코드 작성
```javascript
// src/scripts/calculator/MathEngine.js
class MathEngine {
  evaluate(expression) {
    // 구현
  }
}
```

### 5단계: 테스트 실행 (성공 확인)
```bash
npm run test
# ✅ PASS: All tests passed
```

### 6단계: 리팩토링
- 코드 품질 개선
- 중복 제거
- 성능 최적화

### 7단계: 테스트 재실행 (회귀 테스트)
```bash
npm run test
# ✅ PASS: All tests passed
```

## 테스트 작성 가이드

### 테스트 구조 (AAA 패턴)
```javascript
it('should calculate correctly', () => {
  // Arrange (준비)
  const engine = new MathEngine();
  const expression = '2 + 3';
  
  // Act (실행)
  const result = engine.evaluate(expression);
  
  // Assert (검증)
  expect(result).toBe(5);
});
```

### 테스트 명명 규칙
```javascript
// ✅ 좋은 예
it('should return 5 when adding 2 and 3', () => {});
it('should throw error when dividing by zero', () => {});
it('should convert degrees to radians in DEG mode', () => {});

// ❌ 나쁜 예
it('test1', () => {});
it('works', () => {});
it('addition', () => {});
```

### 테스트 커버리지 목표
- **코어 로직**: 95% 이상
- **유틸리티**: 90% 이상
- **상태 관리**: 85% 이상
- **전체**: 80% 이상

## 테스트 유형

### 1. 단위 테스트 (Unit Test)
개별 함수/메서드 테스트
```javascript
describe('ExpressionParser', () => {
  describe('parse', () => {
    it('should convert × to *', () => {
      expect(ExpressionParser.parse('2×3')).toBe('2*3');
    });
  });
});
```

### 2. 통합 테스트 (Integration Test)
여러 모듈 간 상호작용 테스트
```javascript
describe('Calculator Integration', () => {
  it('should calculate complex expression', () => {
    const calculator = new Calculator();
    const result = calculator.calculate('(2 + 3) × sin(30)');
    expect(result).toBeCloseTo(2.5, 1);
  });
});
```

### 3. 엣지 케이스 테스트
경계값 및 예외 상황 테스트
```javascript
describe('Edge Cases', () => {
  it('should handle division by zero', () => {
    expect(() => engine.evaluate('5 / 0')).toThrow();
  });
  
  it('should handle very large numbers', () => {
    const result = engine.evaluate('999999999999 * 999999999999');
    expect(result).toBeDefined();
  });
});
```

## 테스트 실행

### 개발 중 (Watch 모드)
```bash
npm run test:watch
```

### 전체 테스트
```bash
npm run test
```

### 커버리지 확인
```bash
npm run test:coverage
```

### 특정 파일만 테스트
```bash
npm run test MathEngine.test.js
```

## 테스트 더블 (Test Doubles)

### Mock 사용 예시
```javascript
import { vi } from 'vitest';

describe('Calculator with Mock', () => {
  it('should use mocked MathEngine', () => {
    const mockEngine = {
      evaluate: vi.fn().mockReturnValue(5)
    };
    
    const calculator = new Calculator(mockEngine);
    const result = calculator.calculate('2 + 3');
    
    expect(mockEngine.evaluate).toHaveBeenCalledWith('2 + 3');
    expect(result).toBe(5);
  });
});
```

### Spy 사용 예시
```javascript
it('should call saveState when state changes', () => {
  const stateManager = new StateManager();
  const spy = vi.spyOn(stateManager, 'saveState');
  
  stateManager.setState({ result: '5' });
  
  expect(spy).toHaveBeenCalled();
});
```

## 주의사항

### ⚠️ 하지 말아야 할 것
1. **구현 코드를 먼저 작성하지 않기**
   - 항상 테스트를 먼저 작성
   
2. **테스트를 건너뛰지 않기**
   - "나중에 테스트 작성하겠다"는 금지
   
3. **과도한 테스트 작성 피하기**
   - 의미 없는 테스트는 작성하지 않기
   
4. **구현 세부사항 테스트 피하기**
   - 공개 API만 테스트
   - 내부 구현은 테스트하지 않기

### ✅ 해야 할 것
1. **작은 단위로 테스트 작성**
   - 한 번에 하나의 기능만 테스트
   
2. **독립적인 테스트 작성**
   - 테스트 간 의존성 제거
   
3. **명확한 테스트 작성**
   - 테스트 이름만 봐도 무엇을 테스트하는지 알 수 있게
   
4. **빠른 테스트 작성**
   - 단위 테스트는 밀리초 단위로 실행

## 예외 상황

### UI 이벤트 핸들러
UI와 강하게 결합된 코드는 TDD 제외 가능
```javascript
// ❌ TDD 불필요
button.addEventListener('click', () => {
  display.textContent = '5';
});

// ✅ TDD 필요 (로직 분리)
class ButtonHandler {
  handleClick(value) {
    return this.calculator.addDigit(value);
  }
}
```

### DOM 조작
순수한 DOM 조작은 TDD 제외 가능
```javascript
// ❌ TDD 불필요
element.classList.add('active');

// ✅ TDD 필요 (상태 관리)
class ThemeManager {
  setTheme(isDark) {
    return isDark ? 'dark' : 'light';
  }
}
```

## 체크리스트

새로운 기능 추가 시:
- [ ] 테스트 파일 생성
- [ ] 실패하는 테스트 작성
- [ ] 테스트 실행 (Red)
- [ ] 최소한의 구현 코드 작성
- [ ] 테스트 실행 (Green)
- [ ] 코드 리팩토링
- [ ] 테스트 재실행 (Green 유지)
- [ ] 커버리지 확인 (목표 달성)
- [ ] 커밋 전 전체 테스트 실행

## 참고 자료

- [Vitest 문서](https://vitest.dev/)
- [Test-Driven Development by Example (Kent Beck)](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Growing Object-Oriented Software, Guided by Tests](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)
