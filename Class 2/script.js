const cursor = document.querySelector('.cursor');
const scrollContainer = document.querySelector('.vertical-scroll-container');
const projectList = document.getElementById('project-list');
const scrollLeftButton = document.getElementById('prev');
const scrollRightButton = document.getElementById('next');
const scrollAmount = 300;
const themeToggleButton = document.getElementById('theme-toggle');

let cursorGlowTimeout;

async function fetchProjects() {
    showLoading(true);
    try {
        const response = await fetch('https://api.github.com/users/PrakharDoneria/repos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const projects = await response.json();
        projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        displayProjects(projects);
    } catch (error) {
        showError('Failed to load projects. Please try again later.');
        console.error('Fetch error:', error);
    } finally {
        showLoading(false);
    }
}

function showLoading(isLoading) {
    if (isLoading) {
        projectList.innerHTML = '<p class="loading-message" tabindex="0">Loading projects...</p>';
    } else {
        const loadingMessage = projectList.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
}

function showError(message) {
    projectList.innerHTML = `<p class="error-message" tabindex="0">${message}</p>`;
}

function displayProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.setAttribute('tabindex', '0');
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || 'No description available.'}</p>
            <a href="${project.html_url}" target="_blank" class="view-project" tabindex="0">View Project</a>
        `;
        projectList.appendChild(projectItem);
        // Animate project items with delay
        setTimeout(() => {
            projectItem.classList.add('visible');
        }, index * 150);
    });
}

function handleScroll(direction) {
    scrollContainer.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

scrollLeftButton.addEventListener('click', () => handleScroll(-1));
scrollRightButton.addEventListener('click', () => handleScroll(1));

fetchProjects();

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    if (cursorGlowTimeout) {
        clearTimeout(cursorGlowTimeout);
    }

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    document.body.appendChild(glow);

    cursorGlowTimeout = setTimeout(() => glow.remove(), 1500);
});

document.querySelectorAll('.header-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Dark/Light mode toggle
function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleButton.textContent = 'Dark Mode';
        themeToggleButton.setAttribute('aria-pressed', 'true');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggleButton.textContent = 'Light Mode';
        themeToggleButton.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('theme', theme);
}

themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Initialize theme based on saved preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
}

// Animate sections on scroll into view
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});
