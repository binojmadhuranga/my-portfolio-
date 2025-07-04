  // Hamburger menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling and active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        let activeSection = 'home';

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                activeSection = sectionId;
                updateActiveNavLink();
            }
            
        }

        function updateActiveNavLink() {
            navLinks.forEach(link => {
                link.classList.remove('bg-gradient-to-r', 'from-[#4facfe]', 'to-[#a855f7]', 'text-white', 'shadow-lg');
                if (link.getAttribute('data-section') === activeSection) {
                    link.classList.add('bg-gradient-to-r', 'from-[#4facfe]', 'to-[#a855f7]', 'text-white', 'shadow-lg');
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const sectionId = link.getAttribute('data-section');
                scrollToSection(sectionId);
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Intersection Observer for section visibility
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeSection = entry.target.id;
                    updateActiveNavLink();
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));

        // Generate stars
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }

        // Typing effect for hero title
        const typingText = document.getElementById('typing-text');
        const phrases = ['Fullstack Engineer', 'AI Enthusiast', 'React & Spring Boot Developer', 'Problem Solver'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseDuration = 2000;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            const currentText = currentPhrase.substring(0, charIndex);
            typingText.textContent = currentText;

            if (!isDeleting && charIndex < currentPhrase.length) {
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typingSpeed);
            }
        }

        // Start typing effect
        type();

        // CTA button scroll
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('click', () => {
            scrollToSection('about');
        });