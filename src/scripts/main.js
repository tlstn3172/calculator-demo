// Import styles
import '../styles/index.css';

// Import core logic
import Calculator from './calculator/Calculator.js';
import MathEngine from './calculator/MathEngine.js';
import ExpressionParser from './calculator/ExpressionParser.js';

// Import state management
import StateManager from './state/StateManager.js';
import HistoryManager from './state/HistoryManager.js';

// Import UI controllers
import Display from './ui/Display.js';
import ButtonHandler from './ui/ButtonHandler.js';
import ThemeManager from './ui/ThemeManager.js';

/**
 * 애플리케이션 초기화
 */
function initApp() {
    console.log('Calculator app initializing...');

    // 1. 코어 로직 초기화 (의존성 주입)
    const mathEngine = new MathEngine();
    const expressionParser = new ExpressionParser();
    const calculator = new Calculator(mathEngine, expressionParser);

    // 2. 상태 관리 초기화
    const stateManager = new StateManager();
    const historyManager = new HistoryManager();

    // LocalStorage에서 상태 로드
    stateManager.loadState();
    historyManager.loadHistory();

    // 3. UI 컨트롤러 초기화
    const display = new Display(stateManager);
    const buttonHandler = new ButtonHandler(
        calculator,
        expressionParser,
        stateManager,
        historyManager
    );
    const themeManager = new ThemeManager();

    // 4. 초기 기록 표시
    display.updateHistory(historyManager.getHistory());

    // 5. 메뉴 버튼 이벤트 (다크모드 토글)
    const menuBtn = document.getElementById('btn-menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            themeManager.toggleTheme();
        });
    }

    // 6. 히스토리 버튼 이벤트
    const historyBtn = document.getElementById('btn-history');
    if (historyBtn) {
        historyBtn.addEventListener('click', () => {
            // TODO: 히스토리 패널 토글 (Phase 4 확장)
            console.log('History:', historyManager.getHistory());
        });
    }

    console.log('Calculator app initialized successfully!');
}

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
