(function () {

    // --- Loading Screen ---
    var loader = document.querySelector('.loader');
    var loaderText = document.querySelector('.loader-text');
    var loaderBarFill = document.querySelector('.loader-bar-fill');
    var progress = 0;

    function runLoader() {
        if (progress < 100) {
            progress += Math.random() * 8 + 2;
            if (progress > 100) progress = 100;
            var rounded = Math.floor(progress);
            if (loaderText) loaderText.textContent = String(rounded).padStart(2, '0') + '%';
            if (loaderBarFill) loaderBarFill.style.width = rounded + '%';
            setTimeout(runLoader, 60 + Math.random() * 80);
        } else {
            setTimeout(function () {
                if (loader) loader.classList.add('hidden');
                document.body.style.overflow = '';
                revealSections();
            }, 400);
        }
    }

    document.body.style.overflow = 'hidden';
    runLoader();

    // --- Section Reveal on Scroll ---
    var sections = document.querySelectorAll('.section');

    function revealSections() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: [0.05, 0.1, 0.2],
            rootMargin: '-30px'
        });

        sections.forEach(function (s) { observer.observe(s); });
    }

    // --- Top Nav Scroll Effect & Active Link ---
    var topNav = document.querySelector('.top-nav');
    var navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        if (topNav) {
            topNav.classList.toggle('scrolled', window.scrollY > 50);
        }

        // Highlight active nav link
        var current = '';
        sections.forEach(function (s) {
            var rect = s.getBoundingClientRect();
            if (rect.top <= 200) current = s.id;
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Navigation ---
    var mobileToggle = document.querySelector('.nav-mobile-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
            });
        });
    }

    // --- Toast ---
    var toastEl = document.getElementById('toast');

    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('visible');
        setTimeout(function () {
            toastEl.classList.remove('visible');
        }, 2500);
    }

    // --- Copy Email ---
    window.copyEmail = function () {
        navigator.clipboard.writeText('devyaniarya77@gmail.com').then(function () {
            showToast('Email copied to clipboard');
        }).catch(function () {
            showToast('Failed to copy');
        });
    };

    // --- Download Resume ---
    window.downloadResume = function () {
        var link = document.createElement('a');
        link.href = 'devyani_arya_res_el.pdf';
        link.download = 'Devyani_Arya_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Contact Form ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.querySelector('#contactName');
            var email = contactForm.querySelector('#contactEmail');
            var message = contactForm.querySelector('#contactMessage');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                showToast('Please fill in all fields');
                return;
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                showToast('Please enter a valid email');
                return;
            }

            var subject = encodeURIComponent('Portfolio Contact from ' + name.value.trim());
            var body = encodeURIComponent(message.value.trim() + '\n\nFrom: ' + name.value.trim() + ' (' + email.value.trim() + ')');
            window.location.href = 'mailto:devyaniarya77@gmail.com?subject=' + subject + '&body=' + body;

            showToast('Opening email client...');
            contactForm.reset();
        });
    }

    // --- Easter Egg ---
    var easterEgg = document.getElementById('easterEgg');
    var easterModal = document.getElementById('easterModal');
    var modalOverlay = document.getElementById('modalOverlay');

    if (easterEgg) {
        easterEgg.addEventListener('click', function () {
            if (easterModal) easterModal.classList.add('show');
            if (modalOverlay) modalOverlay.classList.add('show');
        });
    }

    window.closeEasterEgg = function () {
        if (easterModal) easterModal.classList.remove('show');
        if (modalOverlay) modalOverlay.classList.remove('show');
    };

    if (modalOverlay) {
        modalOverlay.addEventListener('click', window.closeEasterEgg);
    }

    // --- Scroll to Top ---
    var scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
