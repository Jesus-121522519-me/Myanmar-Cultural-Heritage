document.addEventListener('DOMContentLoaded', function() {
    var themeToggle = document.getElementById('theme-toggle');
    var themeToggleSide = document.getElementById('theme-toggle-side');
    var heroButtons = document.querySelectorAll('.hero-trigger');
    var mainLinks = document.querySelectorAll('.hero-main-link');
    var fromIntroFlag = localStorage.getItem('fromIntro');
    var isMainPage = document.body.dataset.page === 'main';
    var isIntroPage = document.body.dataset.page === 'intro';
    
    var currentTheme = localStorage.getItem('theme') || 'light';
    
    function updateThemeIcon(isDark) {
        var sunIcon = '<i class="bi bi-sun-fill"></i>';
        var moonIcon = '<i class="bi bi-moon-fill"></i>';

        if (themeToggle) {
            themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
        }
        if (themeToggleSide) {
            themeToggleSide.innerHTML = isDark ? sunIcon : moonIcon;
        }
    }

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcon(currentTheme === 'dark');
    
    function toggleTheme() {
        var isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleSide) {
        themeToggleSide.addEventListener('click', toggleTheme);
    }

    for (var i = 0; i < heroButtons.length; i++) {
        (function(button) {
            button.addEventListener('click', function(event) {
                var targetId = button.getAttribute('data-target');
                var targetElement = document.getElementById(targetId);

                if (!targetElement) {
                    return;
                }

                event.preventDefault();
                document.body.classList.remove('intro-active');

                setTimeout(function() {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            });
        })(heroButtons[i]);
    }

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMainPage && fromIntroFlag) {
        var targetId = fromIntroFlag !== 'true' ? fromIntroFlag : null;

        setTimeout(function() {
            if (targetId) {
                var section = document.getElementById(targetId);
                if (section) {
                    section.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            }
            localStorage.removeItem('fromIntro');
        }, 220);
    }

    for (var j = 0; j < mainLinks.length; j++) {
        (function(link) {
            link.addEventListener('click', function(event) {
                var mapTarget = link.getAttribute('data-main-target');
                var destination = link.getAttribute('href');

                if (isIntroPage) {
                    localStorage.setItem('fromIntro', mapTarget || 'true');

                    if (mapTarget && destination && destination.indexOf('#') === -1) {
                        event.preventDefault();
                        window.location.href = destination;
                    }
                } else if (isMainPage && mapTarget) {
                    event.preventDefault();
                    var section = document.getElementById(mapTarget);
                    if (section) {
                        section.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });
                    } else if (destination) {
                        window.location.href = destination;
                    }
                }
            });
        })(mainLinks[j]);
    }
});