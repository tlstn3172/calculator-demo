# SOLID 원칙

## 개요
이 프로젝트의 모든 코드는 **SOLID 원칙**을 준수하여 구현합니다.
SOLID는 객체지향 설계의 5가지 기본 원칙으로, 유지보수성과 확장성을 높입니다.

## SOLID 원칙 요약

| 원칙 | 이름 | 핵심 개념 |
|------|------|-----------|
| **S** | Single Responsibility Principle | 단일 책임 원칙 |
| **O** | Open-Closed Principle | 개방-폐쇄 원칙 |
| **L** | Liskov Substitution Principle | 리스코프 치환 원칙 |
| **I** | Interface Segregation Principle | 인터페이스 분리 원칙 |
| **D** | Dependency Inversion Principle | 의존성 역전 원칙 |

---

## S - Single Responsibility Principle (단일 책임 원칙)

### 정의
> 클래스는 단 하나의 책임만 가져야 하며, 변경의 이유도 단 하나여야 한다.

### 적용 예시

#### ❌ 나쁜 예: 여러 책임을 가진 클래스
```javascript
class Calculator {
  constructor() {
    this.history = [];
  }
  
  // 책임 1: 계산
  calculate(expression) {
    const result = eval(expression);
    this.saveToHistory(expression, result);
    this.displayResult(result);
    this.saveToLocalStorage(result);
    return result;
  }
  
  // 책임 2: 기록 관리
  saveToHistory(expression, result) {
    this.history.push({ expression, result });
  }
  
  // 책임 3: UI 업데이트
  displayResult(result) {
    document.getElementById('result').textContent = result;
  }
  
  // 책임 4: 데이터 저장
  saveToLocalStorage(result) {
    localStorage.setItem('lastResult', result);
  }
}
```

**문제점**:
- 계산, 기록, UI, 저장 등 4가지 책임
- 한 부분의 변경이 다른 부분에 영향
- 테스트하기 어려움

#### ✅ 좋은 예: 단일 책임으로 분리
```javascript
// 책임 1: 계산만 담당
class MathEngine {
  evaluate(expression) {
    try {
      return this.math.evaluate(expression);
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }
}

// 책임 2: 기록 관리만 담당
class HistoryManager {
  constructor() {
    this.history = [];
  }
  
  addEntry(expression, result) {
    this.history.push({ expression, result, timestamp: Date.now() });
  }
  
  getHistory() {
    return [...this.history];
  }
}

// 책임 3: UI 업데이트만 담당
class Display {
  updateResult(result) {
    this.resultElement.textContent = result;
  }
  
  updateExpression(expression) {
    this.expressionElement.textContent = expression;
  }
}

// 책임 4: 데이터 저장만 담당
class StorageManager {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
```

### 체크리스트
- [ ] 클래스가 하나의 명확한 목적을 가지는가?
- [ ] 클래스 이름이 그 책임을 명확히 표현하는가?
- [ ] 클래스를 변경해야 하는 이유가 하나뿐인가?
- [ ] 메서드들이 모두 같은 목적을 위해 존재하는가?

---

## O - Open-Closed Principle (개방-폐쇄 원칙)

### 정의
> 소프트웨어 엔티티는 확장에는 열려 있어야 하고, 수정에는 닫혀 있어야 한다.

### 적용 예시

#### ❌ 나쁜 예: 새로운 기능 추가 시 기존 코드 수정
```javascript
class Calculator {
  calculate(expression, mode) {
    if (mode === 'basic') {
      return this.basicCalculate(expression);
    } else if (mode === 'scientific') {
      return this.scientificCalculate(expression);
    } else if (mode === 'programmer') {
      // 새로운 모드 추가 시 이 메서드를 수정해야 함
      return this.programmerCalculate(expression);
    }
  }
  
  basicCalculate(expression) {
    // 기본 계산
  }
  
  scientificCalculate(expression) {
    // 공학용 계산
  }
  
  programmerCalculate(expression) {
    // 프로그래머 계산
  }
}
```

**문제점**:
- 새로운 모드 추가 시 `calculate` 메서드 수정 필요
- if-else 체인이 계속 늘어남
- OCP 위반

#### ✅ 좋은 예: 전략 패턴으로 확장 가능하게
```javascript
// 계산 전략 인터페이스 (추상)
class CalculationStrategy {
  evaluate(expression) {
    throw new Error('Must implement evaluate method');
  }
}

// 기본 계산 전략
class BasicCalculation extends CalculationStrategy {
  evaluate(expression) {
    // 기본 사칙연산만
    return eval(expression);
  }
}

// 공학용 계산 전략
class ScientificCalculation extends CalculationStrategy {
  constructor() {
    super();
    this.math = create(all);
  }
  
  evaluate(expression) {
    return this.math.evaluate(expression);
  }
}

// 프로그래머 계산 전략 (새로 추가해도 기존 코드 수정 불필요)
class ProgrammerCalculation extends CalculationStrategy {
  evaluate(expression) {
    // 16진수, 2진수 등 처리
    return parseInt(expression, 16);
  }
}

// Calculator는 수정 없이 확장 가능
class Calculator {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  calculate(expression) {
    return this.strategy.evaluate(expression);
  }
}

// 사용
const calculator = new Calculator(new ScientificCalculation());
calculator.calculate('sin(30)'); // 공학용 계산

calculator.setStrategy(new ProgrammerCalculation());
calculator.calculate('FF'); // 16진수 계산
```

### 체크리스트
- [ ] 새로운 기능 추가 시 기존 코드를 수정하지 않는가?
- [ ] 추상화를 통해 확장 가능한 구조인가?
- [ ] 전략 패턴, 팩토리 패턴 등을 활용했는가?

---

## L - Liskov Substitution Principle (리스코프 치환 원칙)

### 정의
> 자식 클래스는 부모 클래스를 대체할 수 있어야 한다.

### 적용 예시

#### ❌ 나쁜 예: 부모 클래스를 대체할 수 없는 자식
```javascript
class Calculator {
  calculate(expression) {
    return this.evaluate(expression);
  }
  
  evaluate(expression) {
    return eval(expression);
  }
}

class ScientificCalculator extends Calculator {
  constructor() {
    super();
    this.angleMode = 'deg';
  }
  
  // 부모의 calculate를 오버라이드하여 다른 동작
  calculate(expression) {
    // angleMode가 설정되지 않으면 에러 발생
    if (!this.angleMode) {
      throw new Error('Angle mode not set');
    }
    return this.evaluate(expression);
  }
}

// 문제 발생
function performCalculation(calculator) {
  // Calculator를 기대하지만 ScientificCalculator는 다르게 동작
  return calculator.calculate('2 + 3');
}

const calc1 = new Calculator();
performCalculation(calc1); // ✅ 정상 작동

const calc2 = new ScientificCalculator();
calc2.angleMode = null;
performCalculation(calc2); // ❌ 에러 발생 (LSP 위반)
```

#### ✅ 좋은 예: 부모 클래스를 완전히 대체 가능
```javascript
class Calculator {
  evaluate(expression) {
    return this.parse(expression);
  }
  
  parse(expression) {
    // 기본 파싱
    return eval(expression);
  }
}

class ScientificCalculator extends Calculator {
  constructor() {
    super();
    this.angleMode = 'deg'; // 기본값 설정
  }
  
  // 부모의 메서드를 확장하되, 계약은 유지
  parse(expression) {
    // 삼각함수 처리 추가
    const adjusted = this.adjustForAngleMode(expression);
    return super.parse(adjusted);
  }
  
  adjustForAngleMode(expression) {
    if (this.angleMode === 'deg') {
      return expression.replace(/sin\(([^)]+)\)/g, 'sin(($1) * Math.PI / 180)');
    }
    return expression;
  }
}

// 정상 작동
function performCalculation(calculator) {
  return calculator.evaluate('2 + 3');
}

const calc1 = new Calculator();
performCalculation(calc1); // ✅ 5

const calc2 = new ScientificCalculator();
performCalculation(calc2); // ✅ 5 (동일하게 작동)
```

### 체크리스트
- [ ] 자식 클래스가 부모 클래스의 계약을 위반하지 않는가?
- [ ] 자식 클래스로 교체해도 프로그램이 정상 작동하는가?
- [ ] 부모 클래스의 전제 조건을 강화하지 않았는가?
- [ ] 부모 클래스의 후속 조건을 약화하지 않았는가?

---

## I - Interface Segregation Principle (인터페이스 분리 원칙)

### 정의
> 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.

### 적용 예시

#### ❌ 나쁜 예: 비대한 인터페이스
```javascript
// 모든 기능을 포함한 거대한 인터페이스
class CalculatorInterface {
  // 기본 연산
  add(a, b) {}
  subtract(a, b) {}
  multiply(a, b) {}
  divide(a, b) {}
  
  // 공학용 함수
  sin(x) {}
  cos(x) {}
  tan(x) {}
  log(x) {}
  
  // 프로그래머 함수
  toHex(x) {}
  toBinary(x) {}
  bitwiseAnd(a, b) {}
  
  // 통계 함수
  mean(arr) {}
  median(arr) {}
  stdDev(arr) {}
}

// 기본 계산기는 공학용/프로그래머/통계 함수를 사용하지 않음
class BasicCalculator extends CalculatorInterface {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
  
  // 사용하지 않는 메서드들을 억지로 구현해야 함
  sin(x) { throw new Error('Not supported'); }
  cos(x) { throw new Error('Not supported'); }
  // ... 나머지도 마찬가지
}
```

**문제점**:
- 사용하지 않는 메서드에 의존
- 불필요한 구현 강제
- ISP 위반

#### ✅ 좋은 예: 작고 명확한 인터페이스로 분리
```javascript
// 기본 연산 인터페이스
class BasicOperations {
  add(a, b) { throw new Error('Must implement'); }
  subtract(a, b) { throw new Error('Must implement'); }
  multiply(a, b) { throw new Error('Must implement'); }
  divide(a, b) { throw new Error('Must implement'); }
}

// 삼각함수 인터페이스
class TrigonometricOperations {
  sin(x) { throw new Error('Must implement'); }
  cos(x) { throw new Error('Must implement'); }
  tan(x) { throw new Error('Must implement'); }
}

// 로그 함수 인터페이스
class LogarithmicOperations {
  log(x) { throw new Error('Must implement'); }
  ln(x) { throw new Error('Must implement'); }
}

// 기본 계산기는 필요한 인터페이스만 구현
class BasicCalculator extends BasicOperations {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

// 공학용 계산기는 여러 인터페이스를 조합
class ScientificCalculator {
  constructor() {
    this.basicOps = new BasicCalculator();
    this.trigOps = new TrigonometricCalculatorOps();
    this.logOps = new LogarithmicCalculatorOps();
  }
  
  // 필요한 기능만 노출
  add(a, b) { return this.basicOps.add(a, b); }
  sin(x) { return this.trigOps.sin(x); }
  log(x) { return this.logOps.log(x); }
}
```

### JavaScript에서의 적용 (Duck Typing)
JavaScript는 명시적 인터페이스가 없지만, 객체 구성으로 ISP 적용 가능

```javascript
// 기능별로 작은 모듈 분리
const basicOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

const trigonometricOperations = {
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
};

// 필요한 기능만 조합
class Calculator {
  constructor(operations) {
    Object.assign(this, operations);
  }
}

// 기본 계산기
const basicCalc = new Calculator(basicOperations);
basicCalc.add(2, 3); // ✅

// 공학용 계산기
const scientificCalc = new Calculator({
  ...basicOperations,
  ...trigonometricOperations,
});
scientificCalc.sin(30); // ✅
```

### 체크리스트
- [ ] 인터페이스가 단일 목적을 가지는가?
- [ ] 클라이언트가 사용하지 않는 메서드를 포함하지 않는가?
- [ ] 인터페이스가 응집도가 높은가?

---

## D - Dependency Inversion Principle (의존성 역전 원칙)

### 정의
> 고수준 모듈은 저수준 모듈에 의존하지 않아야 한다. 둘 다 추상화에 의존해야 한다.

### 적용 예시

#### ❌ 나쁜 예: 구체적인 구현에 의존
```javascript
class Calculator {
  constructor() {
    // 구체적인 LocalStorage 구현에 직접 의존
    this.storage = {
      save: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      load: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
    };
  }
  
  calculate(expression) {
    const result = eval(expression);
    // LocalStorage에 강하게 결합
    this.storage.save('lastResult', result);
    return result;
  }
}
```

**문제점**:
- LocalStorage에 강하게 결합
- 테스트하기 어려움 (LocalStorage mock 필요)
- 다른 저장소로 변경 시 Calculator 수정 필요
- DIP 위반

#### ✅ 좋은 예: 추상화에 의존
```javascript
// 추상화: Storage 인터페이스
class StorageInterface {
  save(key, value) {
    throw new Error('Must implement save method');
  }
  
  load(key) {
    throw new Error('Must implement load method');
  }
}

// 구체적 구현 1: LocalStorage
class LocalStorageAdapter extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// 구체적 구현 2: SessionStorage
class SessionStorageAdapter extends StorageInterface {
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// 구체적 구현 3: InMemory (테스트용)
class InMemoryStorageAdapter extends StorageInterface {
  constructor() {
    super();
    this.data = new Map();
  }
  
  save(key, value) {
    this.data.set(key, value);
  }
  
  load(key) {
    return this.data.get(key) || null;
  }
}

// Calculator는 추상화에만 의존
class Calculator {
  constructor(storage) {
    // StorageInterface에 의존 (구체적 구현에 의존 X)
    this.storage = storage;
  }
  
  calculate(expression) {
    const result = eval(expression);
    this.storage.save('lastResult', result);
    return result;
  }
}

// 사용
const calculator = new Calculator(new LocalStorageAdapter());
calculator.calculate('2 + 3');

// 테스트
const testCalculator = new Calculator(new InMemoryStorageAdapter());
testCalculator.calculate('2 + 3'); // LocalStorage 없이 테스트 가능
```

### 의존성 주입 (Dependency Injection)
```javascript
// 생성자 주입
class Calculator {
  constructor(mathEngine, storage, display) {
    this.mathEngine = mathEngine;
    this.storage = storage;
    this.display = display;
  }
  
  calculate(expression) {
    const result = this.mathEngine.evaluate(expression);
    this.storage.save('lastResult', result);
    this.display.show(result);
    return result;
  }
}

// 의존성을 외부에서 주입
const calculator = new Calculator(
  new MathEngine(),
  new LocalStorageAdapter(),
  new Display()
);
```

### 체크리스트
- [ ] 고수준 모듈이 저수준 모듈에 직접 의존하지 않는가?
- [ ] 추상화(인터페이스)를 통해 의존성을 관리하는가?
- [ ] 의존성 주입을 사용하는가?
- [ ] 테스트 시 의존성을 쉽게 교체할 수 있는가?

---

## 프로젝트 적용 가이드

### 파일 구조와 SOLID
```
src/scripts/
├── calculator/
│   ├── Calculator.js           # S: 계산 조율만 담당
│   ├── MathEngine.js           # S: 수학 계산만 담당
│   └── ExpressionParser.js     # S: 수식 파싱만 담당
├── state/
│   ├── StateManager.js         # S: 상태 관리만 담당
│   └── HistoryManager.js       # S: 기록 관리만 담당
├── storage/
│   ├── StorageInterface.js     # D: 추상화
│   ├── LocalStorageAdapter.js  # D: 구체적 구현
│   └── InMemoryStorage.js      # D: 테스트용 구현
└── ui/
    ├── Display.js              # S: 화면 표시만 담당
    └── ButtonHandler.js        # S: 이벤트 처리만 담당
```

### 코드 리뷰 체크리스트

#### Single Responsibility
- [ ] 각 클래스가 하나의 책임만 가지는가?
- [ ] 클래스 이름이 그 책임을 명확히 나타내는가?

#### Open-Closed
- [ ] 새 기능 추가 시 기존 코드를 수정하지 않는가?
- [ ] 전략 패턴이나 팩토리 패턴을 활용했는가?

#### Liskov Substitution
- [ ] 자식 클래스가 부모 클래스를 완전히 대체 가능한가?
- [ ] 오버라이드 시 계약을 위반하지 않는가?

#### Interface Segregation
- [ ] 인터페이스가 작고 명확한가?
- [ ] 사용하지 않는 메서드를 포함하지 않는가?

#### Dependency Inversion
- [ ] 구체적 구현이 아닌 추상화에 의존하는가?
- [ ] 의존성 주입을 사용하는가?

## 안티패턴 예시

### ❌ God Object (신 객체)
```javascript
// 모든 것을 다 하는 거대한 클래스
class Calculator {
  // 계산, UI, 저장, 기록, 테마 등 모든 기능
}
```

### ❌ Tight Coupling (강한 결합)
```javascript
class Calculator {
  constructor() {
    this.storage = new LocalStorage(); // 구체적 구현에 강하게 결합
  }
}
```

### ❌ Fragile Base Class (취약한 기반 클래스)
```javascript
class Calculator {
  calculate() {
    // 자식 클래스가 오버라이드하면 깨지는 로직
  }
}
```

## 참고 자료

- [Clean Code (Robert C. Martin)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles of Object-Oriented Design](https://en.wikipedia.org/wiki/SOLID)
- [Agile Software Development, Principles, Patterns, and Practices](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445)
