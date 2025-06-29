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
                <div class="bicycle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,112a47.81,47.81,0,0,0-16.93,3.09L165.93,72H192a8,8,0,0,1,8,8,8,8,0,0,0,16,0,24,24,0,0,0-24-24H152a8,8,0,0,0-6.91,12l11.65,20H99.26L82.91,60A8,8,0,0,0,76,56H48a8,8,0,0,0,0,16H71.41L85.12,95.51,69.41,117.06a48.13,48.13,0,1,0,12.92,9.44l11.59-15.9L125.09,164A8,8,0,1,0,138.91,156l-30.32-52h57.48l11.19,19.17A48,48,0,1,0,208,112ZM80,160a32,32,0,1,1-20.21-29.74l-18.25,25a8,8,0,1,0,12.92,9.42l18.25-25A31.88,31.88,0,0,1,80,160Zm128,32a32,32,0,0,1-22.51-54.72L201.09,164A8,8,0,1,0,214.91,156L199.3,129.21A32,32,0,1,1,208,192Z"></path>
                    </svg>
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
                            <p class="text-[#101518] text-base font-bold leading-tight">決算に向けて売りきりに入っております</p>
                            <p class="text-[#5c778a] text-sm font-normal leading-normal mt-1">あれこれ1台限りっと気づき始めました。</p>
                        </div>
                    </div>
                </div>
                <div class="bicycle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,112a47.81,47.81,0,0,0-16.93,3.09L165.93,72H192a8,8,0,0,1,8,8,8,8,0,0,0,16,0,24,24,0,0,0-24-24H152a8,8,0,0,0-6.91,12l11.65,20H99.26L82.91,60A8,8,0,0,0,76,56H48a8,8,0,0,0,0,16H71.41L85.12,95.51,69.41,117.06a48.13,48.13,0,1,0,12.92,9.44l11.59-15.9L125.09,164A8,8,0,1,0,138.91,156l-30.32-52h57.48l11.19,19.17A48,48,0,1,0,208,112ZM80,160a32,32,0,1,1-20.21-29.74l-18.25,25a8,8,0,1,0,12.92,9.42l18.25-25A31.88,31.88,0,0,1,80,160Zm128,32a32,32,0,0,1-22.51-54.72L201.09,164A8,8,0,1,0,214.91,156L199.3,129.21A32,32,0,1,1,208,192Z"></path>
                    </svg>
                </div>
            </div>
        `;
    }

    startAutoScroll() {
        const items = this.newsContainer.querySelectorAll('.news-item-container');
        if (items.length < 2) return;

        let currentIndex = 0;
        const itemWidth = 350;
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