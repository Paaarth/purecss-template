// Main JavaScript for the site
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CTA button click handler
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            window.location.href = '/contact.html';
        });
    }

    // Mobile menu toggle (for smaller screens)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'pure-menu-link menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.addEventListener('click', function () {
        const menu = document.querySelector('.pure-menu-list');
        menu.classList.toggle('active');
    });

    const menu = document.querySelector('.home-menu');
    if (menu) {
        menu.appendChild(menuToggle);
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.pure-menu-link')?.forEach(link => {
        const linkPage = link.getAttribute('href')?.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('pure-menu-selected');
        }
    });

    // Initialize any other components
    initComponents();
});

function initComponents() {
    // Initialize any components here
    console.log('Site initialized');
}