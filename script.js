
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
    if (!typedEl) return;
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
if (typedEl) setTimeout(typeEffect, 1200);

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
if (document.querySelector('.hero-stat-number')) setTimeout(animateCounters, 1400);

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

window.addEventListener('scroll', () => {
    // Navbar background
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
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
    if (!btt) return;
    if (window.scrollY > 500) {
        btt.classList.add('visible');
    } else {
        btt.classList.remove('visible');
    }
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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

if (navToggle && navOverlay && navLinks) {
    navToggle.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', toggleNav);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleNav();
            }
        });
    });
}

// ==========================================
// PORTFOLIO DATA + ADMIN PANEL
// ==========================================
const defaultProjects = [
    {
        title: 'EduWave Website',
        category: 'Web Development',
        description: 'An educational platform designed to provide learning resources for students and educators.',
        url: 'https://eduwave.lk/',
        linkLabel: 'Visit Website',
        theme: 'edu',
        icon: 'fa-graduation-cap',
        tagClass: 'tag-web'
    },
    {
        title: 'Portfolio Website',
        category: 'Web Development',
        description: 'A personal website to showcase my skills, projects, and creative work to potential clients.',
        url: '',
        linkLabel: 'Current Project',
        theme: 'portfolio',
        icon: 'fa-briefcase',
        tagClass: 'tag-web'
    },
    {
        title: 'PRANADHA Branding',
        category: 'Graphic Design',
        description: 'Created branding and promotional designs for a business including logos and social media content.',
        url: '',
        linkLabel: 'View Details',
        theme: 'design',
        icon: 'fa-palette',
        tagClass: 'tag-design'
    },
    {
        title: 'Bandarawela Tea Branding',
        category: 'Graphic Design',
        description: 'Created branding and promotional designs for a business including logos and social media content.',
        url: '',
        linkLabel: 'View Details',
        theme: 'design',
        icon: 'fa-palette',
        tagClass: 'tag-design'
    },
    {
        title: 'Dinu Vibes',
        category: 'Media',
        description: 'A YouTube channel where I produce and share music content and creative videos.',
        url: 'https://www.youtube.com/@DINU_VIBES_OFFICIAL',
        linkLabel: 'Watch on YouTube',
        theme: 'music',
        icon: 'fa-music',
        tagClass: 'tag-media'
    }
];

const defaultSkills = [
    {
        category: 'Web Development',
        icon: 'fa-code',
        iconClass: 'web',
        skills: [
            { name: 'HTML', icon: 'fa-brands fa-html5' },
            { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
            { name: 'JavaScript', icon: 'fa-brands fa-js' },
            { name: 'Responsive Design', icon: 'fa-solid fa-mobile-screen' },
            { name: 'UI/UX Basics', icon: 'fa-solid fa-wand-magic-sparkles' }
        ]
    },
    {
        category: 'Graphic Design',
        icon: 'fa-palette',
        iconClass: 'design-icon',
        skills: [
            { name: 'Branding', icon: 'fa-solid fa-copyright' },
            { name: 'Social Media Design', icon: 'fa-solid fa-share-nodes' },
            { name: 'Visual Content', icon: 'fa-solid fa-image' }
        ]
    },
    {
        category: 'Tools & Software',
        icon: 'fa-wrench',
        iconClass: 'tools-icon',
        skills: [
            { name: 'VS Code', icon: 'fa-solid fa-terminal' },
            { name: 'Canva / Photoshop', icon: 'fa-solid fa-pen-nib' },
            { name: 'FL Studio', icon: 'fa-solid fa-headphones' },
            { name: 'YouTube Studio', icon: 'fa-brands fa-youtube' }
        ]
    }
];

const projectThemes = ['edu', 'portfolio', 'design', 'music'];
const projectIcons = ['fa-briefcase', 'fa-code', 'fa-palette', 'fa-star'];
const adminPassword = '1234';
const projectsStorageKey = 'portfolioProjects';
const skillsStorageKey = 'portfolioSkills';

let projects = loadStoredData(projectsStorageKey, defaultProjects);
let skillCategories = loadStoredData(skillsStorageKey, defaultSkills);

function loadStoredData(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function savePortfolioData() {
    localStorage.setItem(projectsStorageKey, JSON.stringify(projects));
    localStorage.setItem(skillsStorageKey, JSON.stringify(skillCategories));
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getProjectStyle(category, index) {
    const normalized = category.toLowerCase();
    if (normalized.includes('design')) return { theme: 'design', icon: 'fa-palette', tagClass: 'tag-design' };
    if (normalized.includes('media') || normalized.includes('music') || normalized.includes('video')) {
        return { theme: 'music', icon: 'fa-music', tagClass: 'tag-media' };
    }
    if (normalized.includes('web') || normalized.includes('code')) return { theme: 'edu', icon: 'fa-code', tagClass: 'tag-web' };
    return {
        theme: projectThemes[index % projectThemes.length],
        icon: projectIcons[index % projectIcons.length],
        tagClass: 'tag-web'
    };
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = projects.map((project, index) => {
        const fallbackStyle = getProjectStyle(project.category, index);
        const style = {
            ...fallbackStyle,
            theme: project.theme || fallbackStyle.theme,
            icon: project.icon || fallbackStyle.icon,
            tagClass: project.tagClass || fallbackStyle.tagClass
        };
        const title = escapeHtml(project.title);
        const category = escapeHtml(project.category);
        const description = escapeHtml(project.description);
        const linkLabel = escapeHtml(project.linkLabel || (project.url ? 'Visit Project' : 'View Details'));
        const cardLink = project.url
            ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="project-card-link">${linkLabel} <i class="fa-solid fa-arrow-right"></i></a>`
            : `<span class="project-card-link">${linkLabel} <i class="fa-solid fa-arrow-right"></i></span>`;

        return `
            <div class="project-card reveal-scale delay-${Math.min(index + 1, 5)}">
                <div class="project-card-image ${escapeHtml(style.theme)}">
                    <i class="fa-solid ${escapeHtml(style.icon)}" style="position:relative;z-index:1;color:rgba(255,255,255,0.5);"></i>
                    <div class="project-icon-bg"></div>
                </div>
                <div class="project-card-body">
                    <span class="project-card-tag ${escapeHtml(style.tagClass)}">${category}</span>
                    <h3 class="project-card-title">${title}</h3>
                    <p class="project-card-desc">${description}</p>
                    ${cardLink}
                </div>
            </div>
        `;
    }).join('');

    const projectCounter = document.querySelector('.hero-stat-number[data-count]');
    if (projectCounter) {
        projectCounter.dataset.count = projects.length;
        if (projectCounter.textContent !== '0') projectCounter.textContent = `${projects.length}+`;
    }
}

function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    grid.innerHTML = skillCategories.map((category, index) => {
        const countLabel = category.skills.length === 1 ? '1 Skill' : `${category.skills.length} Skills`;
        const tags = category.skills.map(skill => `
            <div class="skill-tag"><i class="${escapeHtml(skill.icon || 'fa-solid fa-check')}"></i> ${escapeHtml(skill.name)}</div>
        `).join('');

        return `
            <div class="skill-category reveal delay-${Math.min(index + 1, 5)}">
                <div class="skill-category-header">
                    <div class="skill-category-icon ${escapeHtml(category.iconClass || 'web')}">
                        <i class="fa-solid ${escapeHtml(category.icon || 'fa-lightbulb')}"></i>
                    </div>
                    <div>
                        <div class="skill-category-name">${escapeHtml(category.category)}</div>
                        <div class="skill-category-count">${countLabel}</div>
                    </div>
                </div>
                <div class="skill-tags">${tags}</div>
            </div>
        `;
    }).join('');

    const skillCounter = document.querySelectorAll('.hero-stat-number[data-count]')[1];
    if (skillCounter) {
        const skillTotal = skillCategories.reduce((total, category) => total + category.skills.length, 0);
        skillCounter.dataset.count = skillTotal;
        if (skillCounter.textContent !== '0') skillCounter.textContent = `${skillTotal}+`;
    }
}

function renderPortfolio() {
    renderProjects();
    renderSkills();
}

renderPortfolio();

initAdminPanel();

function initAdminPanel() {
    const adminLogin = document.getElementById('adminLogin');
    if (!adminLogin) return;

    const adminDashboard = document.getElementById('adminDashboard');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginMessage = document.getElementById('adminLoginMessage');
    const adminSaveMessage = document.getElementById('adminSaveMessage');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const projectForm = document.getElementById('projectForm');
    const skillForm = document.getElementById('skillForm');

    function showAdminDashboard() {
        adminLogin.hidden = true;
        adminDashboard.hidden = false;
    }

    function showAdminLogin() {
        adminLogin.hidden = false;
        adminDashboard.hidden = true;
        adminPasswordInput.value = '';
    }

    adminLoginBtn.addEventListener('click', () => {
        if (adminPasswordInput.value === adminPassword) {
            showAdminDashboard();
            adminLoginMessage.textContent = '';
        } else {
            adminLoginMessage.textContent = 'Wrong password. Please try again.';
        }
    });

    adminPasswordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') adminLoginBtn.click();
    });

    adminLogoutBtn.addEventListener('click', showAdminLogin);

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('projectTitle').value.trim();
        const category = document.getElementById('projectCategory').value.trim();
        const description = document.getElementById('projectDescription').value.trim();
        const url = document.getElementById('projectUrl').value.trim();
        if (!title || !category || !description) return;

        const style = getProjectStyle(category, projects.length);
        projects.push({
            title,
            category,
            description,
            url,
            linkLabel: url ? 'Visit Project' : 'View Details',
            ...style
        });

        savePortfolioData();
        renderPortfolio();
        observeRevealElements();
        event.target.reset();
        adminSaveMessage.textContent = 'Project added successfully.';
    });

    skillForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = document.getElementById('skillCategory').value.trim();
        const skillName = document.getElementById('skillName').value.trim();
        if (!categoryName || !skillName) return;

        let category = skillCategories.find(item => item.category.toLowerCase() === categoryName.toLowerCase());
        if (!category) {
            category = {
                category: categoryName,
                icon: 'fa-lightbulb',
                iconClass: 'web',
                skills: []
            };
            skillCategories.push(category);
        }
        category.skills.push({ name: skillName, icon: 'fa-solid fa-check' });

        savePortfolioData();
        renderPortfolio();
        observeRevealElements();
        event.target.reset();
        adminSaveMessage.textContent = 'Skill added successfully.';
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
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

function observeRevealElements() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
}

observeRevealElements();

// ==========================================
// CONTACT FORM (basic feedback)
// ==========================================
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', function () {
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
}
