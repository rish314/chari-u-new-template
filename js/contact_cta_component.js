class ContactCtaComponent extends HTMLElement {
    connectedCallback() {
        this.loadContent();
    }

    async loadContent() {
        try {
            const response = await fetch('components/contact_cta.html');
            if (!response.ok) {
                throw new Error(`Failed to fetch contact CTA: ${response.status}`);
            }
            const content = await response.text();
            this.innerHTML = content;
        } catch (error) {
            console.error('Error loading contact CTA component:', error);
            this.innerHTML = `
                <div class="contact-cta-wrapper">
                    <div class="contact-cta-card fallback">
                        <p class="text-[#101518] text-sm">お問い合わせコンテンツの読み込みに失敗しました。</p>
                        <a href="contact.html" class="contact-cta-button">お問い合わせページへ</a>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('contact-cta', ContactCtaComponent);
