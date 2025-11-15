document.addEventListener('DOMContentLoaded', function() {
    console.log('Админ-панель загружена');
    initializeAdminNavigation();
});

function initializeAdminNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    showAdminSection('matches');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            showAdminSection(sectionName);
            setActiveAdminNavLink(this);
        });
    });
    
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('Функция будет реализована в бэке', 'info');
        });
    });
}

function showAdminSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

function setActiveAdminNavLink(activeLink) {
    const allLinks = document.querySelectorAll('.nav-link[data-section]');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}