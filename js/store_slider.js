// 店舗画像スライダー定義
class StoreSlider {
    constructor(container) {
        this.container = container;
        this.currentIndex = 0;
        this.images = [
            "https://chari-u.com/img/top/main01.jpg",
            "/images/top/main02.jpg",
            "/images/top/main03.jpg",
        ];
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.render();
        this.startAutoSlide();
    }

    destroy() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="store-slider-container">
                <div class="store-slider-wrapper">
                    ${this.images.map((image, index) => `
                        <div class="store-slide ${index === 0 ? 'active' : ''}" 
                             style="background-image: url('${image}')">
                        </div>
                    `).join('')}
                </div>
                <div class="slider-indicators">
                    ${this.images.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}" 
                                data-index="${index}" aria-label="indicator"></button>
                    `).join('')}
                </div>
            </div>
        `;

        // インジケーターのクリックイベントを追加
        this.container.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    goToSlide(index) {
        // 現在のスライドを非アクティブに
        const currentSlide = this.container.querySelector('.store-slide.active');
        const currentIndicator = this.container.querySelector('.indicator.active');

        if (currentSlide) currentSlide.classList.remove('active');
        if (currentIndicator) currentIndicator.classList.remove('active');

        // 新しいスライドをアクティブに
        const newSlide = this.container.querySelectorAll('.store-slide')[index];
        const newIndicator = this.container.querySelectorAll('.indicator')[index];

        if (newSlide) newSlide.classList.add('active');
        if (newIndicator) newIndicator.classList.add('active');

        this.currentIndex = index;
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // 4秒ごとに切り替え
    }
}

// news.htmlから更新日を取得してページ内の#last-updatedを更新
async function updateLastUpdatedDate() {
    try {
        const res = await fetch('news.html', { cache: 'no-cache' });
        if (!res.ok) return;
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const newsUpdatedEl = doc.getElementById('last-updated');
        const dateText = newsUpdatedEl ? newsUpdatedEl.textContent.trim() : '';
        if (!dateText) return;
        
        // ページ内の#last-updated要素を更新
        const mainPageEl = document.getElementById('last-updated');
        if (mainPageEl) {
            mainPageEl.textContent = dateText;
        }
    } catch (e) {
        console.error('更新日の取得に失敗しました:', e);
    }
}

// DOMが読み込まれた後にスライダーを初期化
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('store-slider');
    if (sliderContainer) {
        new StoreSlider(sliderContainer);
    }
    // 更新日を取得して表示
    updateLastUpdatedDate();
});
