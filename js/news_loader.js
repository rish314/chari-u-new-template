// news.htmlのテーブルをそのまま読み込んで表示する
class NewsLoader {
    constructor() {
        this.newsContainer = document.getElementById('newsContainer');
        this.init();
    }

    async init() {
        try {
            await this.loadAndRenderNewsTable();
        } catch (error) {
            console.error('ニュースの読み込みに失敗しました:', error);
            this.showFallbackContent();
        }
    }

    async loadAndRenderNewsTable() {
        const response = await fetch('news.html', { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();

        // HTMLをパースして<table>を抽出
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const table = doc.querySelector('table');

        if (!table) throw new Error('news.htmlに<table>が見つかりません');

        // テーブルの各行を2列グリッドレイアウトで表示
        const rows = table.querySelectorAll('tbody tr');
        const newsItems = Array.from(rows).map(row => {
            const td = row.querySelector('td');
            return td ? td.innerHTML : '';
        }).filter(content => content.trim().length > 0);

        // 2列グリッドコンテナに変換
        const gridHtml = newsItems.map(content => `
            <div class="news-grid-item">
                ${content}
            </div>
        `).join('');

        this.newsContainer.innerHTML = `<div class="news-grid-container">${gridHtml}</div>`;
    }

    showFallbackContent() {
        this.newsContainer.innerHTML = `
            <div class="text-[#101518] text-base font-bold leading-tight">ニュースの読み込みに失敗しました</div>
            <p class="text-[#5c778a] text-sm leading-normal mt-1">時間をおいて再度お試しください。</p>
        `;
    }
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', () => {
    new NewsLoader();
}); 