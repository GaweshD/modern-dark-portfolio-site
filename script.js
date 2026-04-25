
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
        image: 'assets/projects/eduwave.svg',
        url: 'https://eduwave.lk/',
        linkLabel: 'Visit Website',
        theme: 'edu',
        icon: 'fa-graduation-cap',
        tagClass: 'tag-web'
    },
    {
        title: 'Dinu Vibes',
        category: 'Media',
        description: 'A YouTube channel where I produce and share music content and creative videos.',
        image: 'assets/projects/Dinu Vibes.svg',
        url: 'https://www.youtube.com/@DINU_VIBES_OFFICIAL',
        linkLabel: 'Watch on YouTube',
        theme: 'music',
        icon: 'fa-music',
        tagClass: 'tag-media'
    },
    {
        title: 'Portfolio Website',
        category: 'Web Development',
        description: 'A personal website to showcase my skills, projects, and creative work to potential clients.',
        image: 'assets/projects/logo.png',
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
        image: 'assets/projects/pranadha.svg',
        url: '',
        linkLabel: 'View Details',
        theme: 'design',
        icon: 'fa-palette',
        tagClass: 'tag-design'
    },
    {
        title: 'Bandarawela Tea Branding',
        category: 'Graphic Design',
        description: 'Designed branding and promotional materials for Bandarawela Tea, including logo creation, packaging stickers, and Facebook page content.',
        image: 'assets/projects/tea.svg',
        url: '',
        linkLabel: 'View Details',
        theme: 'design',
        icon: 'fa-palette',
        tagClass: 'tag-design'
    },
    {
        title: 'Everrose Branding',
        category: 'Graphic Design',
        description: 'Designed complete branding and promotional assets, including logos and social media content, to enhance business visibility..',
        image: 'assets/projects/Everrose.svg',
        url: '',
        linkLabel: 'View Details',
        theme: 'design',
        icon: 'fa-palette',
        tagClass: 'tag-design'
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
const projectImageBasePath = 'assets/projects/';
const fallbackProjectImage = `${projectImageBasePath}default.svg`;

let projects = loadStoredData(projectsStorageKey, defaultProjects);
let skillCategories = loadStoredData(skillsStorageKey, defaultSkills);

projects = projects.map((project, index) => ({
    ...project,
    image: normalizeProjectImagePath(project.image || defaultProjects[index]?.image || fallbackProjectImage)
}));

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

function normalizeProjectImagePath(input) {
    const raw = String(input || '').trim();
    if (!raw) return fallbackProjectImage;
    if (raw.startsWith(projectImageBasePath)) return raw;
    const fileName = raw.split('/').pop().split('\\').pop().split('?')[0].split('#')[0];
    if (!fileName) return fallbackProjectImage;
    return `${projectImageBasePath}${fileName}`;
}

function imageFileNameFromPath(pathValue) {
    return String(pathValue || '').split('/').pop();
}

function ensureSelectHasValue(selectEl, value) {
    if (!selectEl || !value) return;
    const exists = Array.from(selectEl.options).some(option => option.value === value);
    if (!exists) {
        const customOption = document.createElement('option');
        customOption.value = value;
        customOption.textContent = value;
        selectEl.appendChild(customOption);
    }
}

function refreshSkillCategorySelectOptions() {
    const addSelect = document.getElementById('skillCategory');
    const editSelect = document.getElementById('skillModalCategory');
    if (!addSelect && !editSelect) return;

    const defaultOptions = ['Web Development', 'Graphic Design', 'Tools & Software', 'Media'];
    const dynamicOptions = skillCategories.map(category => category.category);
    const uniqueOptions = [...new Set([...defaultOptions, ...dynamicOptions])];

    function applyOptions(selectEl) {
        if (!selectEl) return;
        const selectedValue = selectEl.value;
        const placeholder = '<option value="" disabled>Select category</option>';
        const options = uniqueOptions
            .map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
            .join('');
        selectEl.innerHTML = `${placeholder}${options}`;
        if (selectedValue && uniqueOptions.includes(selectedValue)) {
            selectEl.value = selectedValue;
        } else {
            selectEl.value = '';
        }
    }

    applyOptions(addSelect);
    applyOptions(editSelect);
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
        const image = escapeHtml(project.image || fallbackProjectImage);
        const linkLabel = escapeHtml(project.linkLabel || (project.url ? 'Visit Project' : 'View Details'));
        const cardLink = project.url
            ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="project-card-link">${linkLabel} <i class="fa-solid fa-arrow-right"></i></a>`
            : `<span class="project-card-link">${linkLabel} <i class="fa-solid fa-arrow-right"></i></span>`;

        return `
            <div class="project-card reveal-scale delay-${Math.min(index + 1, 5)}">
                <div class="project-card-image ${escapeHtml(style.theme)}">
                    <img src="${image}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='assets/projects/default.svg';" />
                    <div class="project-image-overlay"></div>
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
renderAdminLists();

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
    const adminProjectsList = document.getElementById('adminProjectsList');
    const adminSkillsList = document.getElementById('adminSkillsList');
    const projectEditModal = document.getElementById('projectEditModal');
    const skillEditModal = document.getElementById('skillEditModal');

    const projectTitleEl = document.getElementById('projectTitle');
    const projectCategoryEl = document.getElementById('projectCategory');
    const projectDescriptionEl = document.getElementById('projectDescription');
    const projectImageEl = document.getElementById('projectImage');
    const projectUrlEl = document.getElementById('projectUrl');
    const skillCategoryEl = document.getElementById('skillCategory');
    const skillNameEl = document.getElementById('skillName');

    const projectModalIndexEl = document.getElementById('projectModalIndex');
    const projectModalTitleEl = document.getElementById('projectModalTitle');
    const projectModalCategoryEl = document.getElementById('projectModalCategory');
    const projectModalDescriptionEl = document.getElementById('projectModalDescription');
    const projectModalImageEl = document.getElementById('projectModalImage');
    const projectModalUrlEl = document.getElementById('projectModalUrl');
    const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
    const projectModalCancelBtn = document.getElementById('projectModalCancelBtn');
    const projectModalSaveBtn = document.getElementById('projectModalSaveBtn');

    const skillModalCategoryIndexEl = document.getElementById('skillModalCategoryIndex');
    const skillModalIndexEl = document.getElementById('skillModalIndex');
    const skillModalCategoryEl = document.getElementById('skillModalCategory');
    const skillModalNameEl = document.getElementById('skillModalName');
    const skillModalCloseBtn = document.getElementById('skillModalCloseBtn');
    const skillModalCancelBtn = document.getElementById('skillModalCancelBtn');
    const skillModalSaveBtn = document.getElementById('skillModalSaveBtn');

    refreshSkillCategorySelectOptions();

    function closeModal(modalEl) {
        modalEl.hidden = true;
        document.body.style.overflow = '';
    }

    function openModal(modalEl) {
        modalEl.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        closeModal(projectEditModal);
    }

    function closeSkillModal() {
        closeModal(skillEditModal);
    }

    function startProjectEdit(index) {
        const project = projects[index];
        if (!project) return;

        projectModalIndexEl.value = String(index);
        projectModalTitleEl.value = project.title;
        ensureSelectHasValue(projectModalCategoryEl, project.category);
        projectModalCategoryEl.value = project.category;
        projectModalDescriptionEl.value = project.description;
        projectModalImageEl.value = imageFileNameFromPath(project.image);
        projectModalUrlEl.value = project.url || '';
        openModal(projectEditModal);
    }

    function startSkillEdit(categoryIndex, skillIndex) {
        const category = skillCategories[categoryIndex];
        const skill = category?.skills?.[skillIndex];
        if (!skill) return;

        ensureSelectHasValue(skillModalCategoryEl, category.category);
        skillModalCategoryIndexEl.value = String(categoryIndex);
        skillModalIndexEl.value = String(skillIndex);
        skillModalCategoryEl.value = category.category;
        skillModalNameEl.value = skill.name;
        openModal(skillEditModal);
    }

    function showAdminDashboard() {
        adminLogin.hidden = true;
        adminDashboard.hidden = false;
        renderAdminLists();
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
    projectModalCloseBtn.addEventListener('click', closeProjectModal);
    projectModalCancelBtn.addEventListener('click', closeProjectModal);
    skillModalCloseBtn.addEventListener('click', closeSkillModal);
    skillModalCancelBtn.addEventListener('click', closeSkillModal);

    projectEditModal.addEventListener('click', (event) => {
        if (event.target === projectEditModal) closeProjectModal();
    });
    skillEditModal.addEventListener('click', (event) => {
        if (event.target === skillEditModal) closeSkillModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!projectEditModal.hidden) closeProjectModal();
            if (!skillEditModal.hidden) closeSkillModal();
        }
    });

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = projectTitleEl.value.trim();
        const category = projectCategoryEl.value.trim();
        const description = projectDescriptionEl.value.trim();
        const image = projectImageEl.value.trim();
        const url = projectUrlEl.value.trim();
        if (!title || !category || !description || !image) return;

        const style = getProjectStyle(category, projects.length);
        const nextProject = {
            title,
            category,
            description,
            image: normalizeProjectImagePath(image),
            url,
            linkLabel: url ? 'Visit Project' : 'View Details',
            ...style
        };
        projects.push(nextProject);

        savePortfolioData();
        renderPortfolio();
        renderAdminLists();
        observeRevealElements();
        projectForm.reset();
        adminSaveMessage.textContent = 'Project added successfully.';
    });

    skillForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = skillCategoryEl.value.trim();
        const skillName = skillNameEl.value.trim();
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
        renderAdminLists();
        refreshSkillCategorySelectOptions();
        observeRevealElements();
        skillForm.reset();
        adminSaveMessage.textContent = 'Skill added successfully.';
    });

    projectModalSaveBtn.addEventListener('click', () => {
        const editIndex = Number(projectModalIndexEl.value);
        const title = projectModalTitleEl.value.trim();
        const category = projectModalCategoryEl.value.trim();
        const description = projectModalDescriptionEl.value.trim();
        const image = projectModalImageEl.value.trim();
        const url = projectModalUrlEl.value.trim();
        if (!Number.isInteger(editIndex) || !projects[editIndex]) return;
        if (!title || !category || !description || !image) return;

        const style = getProjectStyle(category, editIndex);
        projects[editIndex] = {
            ...projects[editIndex],
            title,
            category,
            description,
            image: normalizeProjectImagePath(image),
            url,
            linkLabel: url ? 'Visit Project' : 'View Details',
            ...style
        };

        savePortfolioData();
        renderPortfolio();
        renderAdminLists();
        observeRevealElements();
        adminSaveMessage.textContent = 'Project updated successfully.';
        closeProjectModal();
    });

    skillModalSaveBtn.addEventListener('click', () => {
        const categoryIndex = Number(skillModalCategoryIndexEl.value);
        const skillIndex = Number(skillModalIndexEl.value);
        const categoryName = skillModalCategoryEl.value.trim();
        const skillName = skillModalNameEl.value.trim();
        if (!categoryName || !skillName) return;
        if (!Number.isInteger(categoryIndex) || !Number.isInteger(skillIndex)) return;
        if (!skillCategories[categoryIndex]?.skills?.[skillIndex]) return;

        const oldSkill = skillCategories[categoryIndex].skills[skillIndex];
        skillCategories[categoryIndex].skills.splice(skillIndex, 1);
        if (skillCategories[categoryIndex].skills.length === 0) {
            skillCategories.splice(categoryIndex, 1);
        }

        let targetCategory = skillCategories.find(item => item.category.toLowerCase() === categoryName.toLowerCase());
        if (!targetCategory) {
            targetCategory = {
                category: categoryName,
                icon: 'fa-lightbulb',
                iconClass: 'web',
                skills: []
            };
            skillCategories.push(targetCategory);
        }
        targetCategory.skills.push({ name: skillName, icon: oldSkill.icon || 'fa-solid fa-check' });

        savePortfolioData();
        renderPortfolio();
        renderAdminLists();
        refreshSkillCategorySelectOptions();
        observeRevealElements();
        adminSaveMessage.textContent = 'Skill updated successfully.';
        closeSkillModal();
    });

    adminProjectsList.addEventListener('click', (event) => {
        const editBtn = event.target.closest('[data-project-edit]');
        if (editBtn) {
            const editIndex = Number(editBtn.dataset.projectEdit);
            if (!Number.isNaN(editIndex)) startProjectEdit(editIndex);
            return;
        }

        const removeBtn = event.target.closest('[data-project-remove]');
        if (!removeBtn) return;
        const index = Number(removeBtn.dataset.projectRemove);
        if (Number.isNaN(index)) return;

        projects.splice(index, 1);
        savePortfolioData();
        renderPortfolio();
        renderAdminLists();
        observeRevealElements();
        adminSaveMessage.textContent = 'Project removed successfully.';
    });

    adminSkillsList.addEventListener('click', (event) => {
        const editBtn = event.target.closest('[data-skill-edit]');
        if (editBtn) {
            const categoryIndex = Number(editBtn.dataset.categoryIndex);
            const skillIndex = Number(editBtn.dataset.skillEdit);
            if (!Number.isNaN(categoryIndex) && !Number.isNaN(skillIndex)) {
                startSkillEdit(categoryIndex, skillIndex);
            }
            return;
        }

        const removeBtn = event.target.closest('[data-skill-remove]');
        if (!removeBtn) return;
        const categoryIndex = Number(removeBtn.dataset.categoryIndex);
        const skillIndex = Number(removeBtn.dataset.skillRemove);
        if (Number.isNaN(categoryIndex) || Number.isNaN(skillIndex)) return;
        if (!skillCategories[categoryIndex]) return;

        skillCategories[categoryIndex].skills.splice(skillIndex, 1);
        if (skillCategories[categoryIndex].skills.length === 0) {
            skillCategories.splice(categoryIndex, 1);
        }

        savePortfolioData();
        renderPortfolio();
        renderAdminLists();
        refreshSkillCategorySelectOptions();
        observeRevealElements();
        adminSaveMessage.textContent = 'Skill removed successfully.';
    });
}

function renderAdminLists() {
    const projectsListEl = document.getElementById('adminProjectsList');
    const skillsListEl = document.getElementById('adminSkillsList');
    if (!projectsListEl || !skillsListEl) return;

    if (projects.length === 0) {
        projectsListEl.innerHTML = '<p class="admin-list-empty">No projects found.</p>';
    } else {
        projectsListEl.innerHTML = projects.map((project, index) => `
            <div class="admin-list-item">
                <div class="admin-list-content">
                    <strong>${escapeHtml(project.title)}</strong>
                    <span>${escapeHtml(project.category)} | ${escapeHtml(imageFileNameFromPath(project.image))}</span>
                </div>
                <div class="admin-list-actions">
                    <button type="button" class="admin-edit-btn" data-project-edit="${index}">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button type="button" class="admin-delete-btn" data-project-remove="${index}">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    const skillRows = [];
    skillCategories.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
            skillRows.push(`
                <div class="admin-list-item">
                    <div class="admin-list-content">
                        <strong>${escapeHtml(skill.name)}</strong>
                        <span>${escapeHtml(category.category)}</span>
                    </div>
                    <div class="admin-list-actions">
                        <button type="button" class="admin-edit-btn" data-category-index="${categoryIndex}" data-skill-edit="${skillIndex}">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button type="button" class="admin-delete-btn" data-category-index="${categoryIndex}" data-skill-remove="${skillIndex}">
                            <i class="fa-solid fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `);
        });
    });

    skillsListEl.innerHTML = skillRows.length
        ? skillRows.join('')
        : '<p class="admin-list-empty">No skills found.</p>';
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
