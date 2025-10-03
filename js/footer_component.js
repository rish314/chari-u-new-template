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
}
// Register the custom element
customElements.define('footer-component', FooterComponent);

// No need to replace elements as we're using the custom element directly in the HTML
