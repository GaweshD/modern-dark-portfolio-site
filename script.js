    // ==========================================
    // PRELOADER
    // ==========================================
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
      }, 600);
    });

    // ==========================================
    // PARTICLES BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // ==========================================
    // TYPING EFFECT
    // ==========================================
    const roles = [
      'Web Developer',
      'Tech Enthusiast',
      'Graphic Designer',
      'University Student'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedEl = document.getElementById('typedText');

    function typeEffect() {
      const current = roles[roleIndex];
      if (isDeleting) {
        charIndex--;
        typedEl.textContent = current.substring(0, charIndex);
      } else {
        charIndex++;
        typedEl.textContent = current.substring(0, charIndex);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 1200);

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounters() {
      const counters = document.querySelectorAll('.hero-stat-number');
      counters.forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 1500;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target) + '+';
          if (progress < 1) requestAnimationFrame(updateCounter);
        }
        requestAnimationFrame(updateCounter);
      });
    }
    setTimeout(animateCounters, 1400);

    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    window.addEventListener('scroll', () => {
      // Navbar background
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active link
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });

      // Back to top
      const btt = document.getElementById('backToTop');
      if (window.scrollY > 500) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    });

    document.getElementById('backToTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // MOBILE NAV
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function toggleNav() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', toggleNav);

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          toggleNav();
        }
      });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // CONTACT FORM (basic feedback)
    // ==========================================
    document.getElementById('sendBtn').addEventListener('click', function () {
      const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
      let filled = true;
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          filled = false;
          input.style.borderColor = '#f87171';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });
      if (filled) {
        this.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        inputs.forEach(input => input.value = '');
        setTimeout(() => {
          this.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
          this.style.background = '';
        }, 3000);
      }
    });
  