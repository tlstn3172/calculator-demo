/**
 * ThemeManager - 테마 관리자
 * 
 * 다크모드/라이트모드를 관리합니다.
 * 시스템 설정을 감지하고 LocalStorage에 저장합니다.
 * 
 * @class
 */
class ThemeManager {
    /**
     * ThemeManager 생성자
     */
    constructor() {
        this.currentTheme = 'dark'; // 기본값
        this.init();
    }

    /**
     * 테마 관리자를 초기화합니다.
     */
    init() {
        // LocalStorage에서 테마 로드
        this.loadTheme();

        // 시스템 다크모드 변경 감지
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // 사용자가 수동으로 설정하지 않았다면 시스템 설정 따름
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // 초기 테마 적용
        this.applyTheme();
    }

    /**
     * 테마를 설정합니다.
     * 
     * @param {string} theme - 'dark' 또는 'light'
     */
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            this.applyTheme();
            this.saveTheme();
        }
    }

    /**
     * 테마를 토글합니다.
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * 현재 테마를 반환합니다.
     * 
     * @returns {string} 현재 테마
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * 테마를 DOM에 적용합니다.
     */
    applyTheme() {
        const html = document.documentElement;

        if (this.currentTheme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    /**
     * 테마를 LocalStorage에 저장합니다.
     */
    saveTheme() {
        try {
            localStorage.setItem('theme', this.currentTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    }

    /**
     * LocalStorage에서 테마를 불러옵니다.
     */
    loadTheme() {
        try {
            const savedTheme = localStorage.getItem('theme');

            if (savedTheme) {
                this.currentTheme = savedTheme;
            } else {
                // 저장된 테마가 없으면 시스템 설정 확인
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.currentTheme = prefersDark ? 'dark' : 'light';
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
            this.currentTheme = 'dark';
        }
    }
}

export default ThemeManager;
