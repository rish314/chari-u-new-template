// Define the footer web component
class FooterComponent extends HTMLElement {
    constructor() {
        super();

        // We'll use connectedCallback to render the component
        // when it's connected to the DOM
    }

    // Called when the element is inserted into the DOM
    connectedCallback() {
        // Fetch and render the footer content from the external HTML file
        this.fetchFooterContent();
    }

    // Fetch the footer HTML content from the external file
    async fetchFooterContent() {
        try {
            const response = await fetch('components/footer.html');
            if (!response.ok) {
                throw new Error(`Failed to fetch footer content: ${response.status}`);
            }
            const html = await response.text();
            this.innerHTML = html;
            // After rendering the footer, update the last-updated date from news.html
            this.updateLastUpdatedFromNews();
        } catch (error) {
            console.error('Error loading footer component:', error);
            // Fallback to a simple footer if the fetch fails
            this.innerHTML = `
                <footer class="bg-[#e53768] text-white py-8 md:py-12 mt-10">
                    <div class="container mx-auto px-4">
                        <p class="text-white text-sm text-center">© 2023 K-yuuki.</p>
                    </div>
                </footer>
            `;
        }
    }

    // Fetch the date from news.html and apply it to the footer
    async updateLastUpdatedFromNews() {
        try {
            const res = await fetch('news.html', { cache: 'no-cache' });
            if (!res.ok) return;
            const text = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const newsUpdatedEl = doc.getElementById('last-updated') || doc.querySelector('#last-updated');
            const dateText = newsUpdatedEl ? (newsUpdatedEl.textContent || '').trim() : '';
            if (!dateText) return;
            const footerEl = this.querySelector('#footer-last-updated');
            if (footerEl) {
                footerEl.textContent = dateText;
            }
        } catch (e) {
            // Silent fail – keep default footer date
            console.debug('Footer last-updated sync skipped:', e);
        }
    }
}

// Register the custom element
customElements.define('footer-component', FooterComponent);

// No need to replace elements as we're using the custom element directly in the HTML
