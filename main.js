document.addEventListener('DOMContentLoaded', () => {
    
    /* SCROLL REVEAL */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach(element => revealObserver.observe(element));

    /* THEME */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });

    /* LIGHTBOX + FLASH */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    const flashDiv = document.createElement('div');
    flashDiv.className = 'camera-flash-overlay';
    document.body.appendChild(flashDiv);

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            flashDiv.classList.remove('flash-active');
            void flashDiv.offsetWidth;
            flashDiv.classList.add('flash-active');

            setTimeout(() => {
                lightboxImg.setAttribute('src', img.getAttribute('src'));
                lightboxImg.setAttribute('alt', img.getAttribute('alt'));
                lightbox.showModal();
            }, 80); 
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.close();
    });

    /* CURSOR GLOW */
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mouseenter', () => cursorGlow.style.opacity = '0.15');
    document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.opacity = '0.12';
        cursorGlow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });
});