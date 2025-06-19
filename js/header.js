// ヘッダーWebComponent定義
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.fetchHeaderContent();
    }
    async fetchHeaderContent() {
        try {
            const response = await fetch('components/header.html');
            if (!response.ok) throw new Error(`Failed to fetch header content: ${response.status}`);
            const html = await response.text();
            this.innerHTML = html;
        } catch (error) {
            console.error('Error loading header component:', error);
            this.innerHTML = `<div class='bg-gray-200 text-center h-[60px]'>ヘッダーの読み込みに失敗しました</div>`;
        }
    }
}
customElements.define('header-component', HeaderComponent); 