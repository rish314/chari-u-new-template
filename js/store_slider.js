// 店舗画像スライダーWebComponent定義
class StoreSliderComponent extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.images = [
            "https://chari-u.com/img/top/main01.jpg",
            "https://chari-u.com/img/top/main02.jpg", 
            "https://chari-u.com/img/top/main03.jpg",
            "https://chari-u.com/img/top/main04.jpg"
        ];
        this.autoSlideInterval = null;
    }

    connectedCallback() {
        this.render();
        this.startAutoSlide();
    }

    disconnectedCallback() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    render() {
        this.innerHTML = `
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
                                data-index="${index}"></button>
                    `).join('')}
                </div>
            </div>
        `;

        // インジケーターのクリックイベントを追加
        this.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    goToSlide(index) {
        // 現在のスライドを非アクティブに
        const currentSlide = this.querySelector('.store-slide.active');
        const currentIndicator = this.querySelector('.indicator.active');
        
        if (currentSlide) currentSlide.classList.remove('active');
        if (currentIndicator) currentIndicator.classList.remove('active');

        // 新しいスライドをアクティブに
        const newSlide = this.querySelectorAll('.store-slide')[index];
        const newIndicator = this.querySelectorAll('.indicator')[index];
        
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

customElements.define('store-slider', StoreSliderComponent);