// 共通：モバイルメニューのトグル
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (!mobileNav || !hamburgerIcon || !closeIcon) return;

    // Toggle the mobile nav active class
    mobileNav.classList.toggle('active');

    // Toggle between hamburger and close icons
    if (mobileNav.classList.contains('active')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// 共通：モバイルメニューのリンククリック時にメニューを閉じる
function setupMobileMenuLinks() {
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    if (!mobileNav || !hamburgerIcon || !closeIcon) return;
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenuLinks();
}); 