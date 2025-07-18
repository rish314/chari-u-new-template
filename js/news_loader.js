// news.htmlの内容を読み込んで吹き出しに表示する
class NewsLoader {
    constructor() {
        this.newsContainer = document.getElementById('newsContainer');
        this.newsItems = [];
        this.init();
    }

    async init() {
        try {
            await this.loadNewsContent();
            this.renderNewsItems();
            this.startAutoScroll();
        } catch (error) {
            console.error('ニュースの読み込みに失敗しました:', error);
            this.showFallbackContent();
        }
    }

    async loadNewsContent() {
        const response = await fetch('news.html');
        const html = await response.text();
        
        // HTMLをパースしてtd要素を取得
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const tdElements = doc.querySelectorAll('td');
        
        // 空でないtd要素の内容を収集
        this.newsItems = Array.from(tdElements)
            .map(td => this.extractTextContent(td))
            .filter(text => text.trim().length > 0)
            .slice(0, 20); // 最大10件まで
    }

    extractTextContent(element) {
        // リンクを保持しながらテキストを抽出
        const links = element.querySelectorAll('a');
        let content = element.innerHTML;
        
        // リンクを保持
        links.forEach(link => {
            const href = link.getAttribute('href');
            const text = link.textContent;
            content = content.replace(link.outerHTML, `<a href="${href}" class="text-[#4aaa8d] hover:underline">${text}</a>`);
        });
        
        // 改行を保持
        content = content.replace(/<br\s*\/?>/gi, '<br>');
        
        return content;
    }

    renderNewsItems() {
        if (this.newsItems.length === 0) {
            this.showFallbackContent();
            return;
        }

        this.newsContainer.innerHTML = this.newsItems.map((content, index) => `
            <div class="news-item-container flex-shrink-0 w-80">
                <div class="news-cloud-box">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="text-[#101518] text-sm font-normal leading-normal">
                                ${content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showFallbackContent() {
        this.newsContainer.innerHTML = `
            <div class="news-item-container flex-shrink-0 w-80">
                <div class="news-cloud-box">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <p class="text-[#101518] text-base font-bold leading-tight">ニュースの読み込みに失敗しました</p>
                            <p class="text-[#5c778a] text-sm font-normal leading-normal mt-1">ニュースの読み込みに失敗しました。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    startAutoScroll() {
        const items = this.newsContainer.querySelectorAll('.news-item-container');
        if (items.length < 2) return;

        let currentIndex = 0;
        const itemWidth = 340;
        const scrollPause = 2200; // 停止時間(ms)
        const scrollDuration = 600; // スクロールアニメーション時間(ms)

        const scrollToIndex = (index) => {
            this.newsContainer.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
        };

        const autoScroll = () => {
            currentIndex = (currentIndex + 1) % items.length;
            scrollToIndex(currentIndex);
            setTimeout(autoScroll, scrollPause + scrollDuration);
        };

        // 初期位置
        scrollToIndex(0);
        setTimeout(autoScroll, scrollPause);
    }
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', () => {
    new NewsLoader();
}); 