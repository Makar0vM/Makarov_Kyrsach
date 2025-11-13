document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Футбольной лиги Оренбурга загружен!');
    
    initializeNavigation();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    showSection('table');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            
            if (sectionName === 'auth') {
                window.location.href = 'auth.html';
            } else {
                showSection(sectionName);
                setActiveNavLink(this);
            }
        });
    });
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        console.log('Переход на страницу:', getSectionTitle(sectionName));
    }
}

function setActiveNavLink(activeLink) {
    const allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

function getSectionTitle(sectionName) {
    const titles = {
        'table': 'Турнирная таблица',
        'news': 'Новости',
        'auth': 'Авторизация'
    };
    return titles[sectionName] || 'Неизвестная страница';
}

window.navigation = {
    goToTable: function() {
        showSection('table');
        setActiveNavLink(document.querySelector('[data-section="table"]'));
    },
    goToNews: function() {
        showSection('news');
        setActiveNavLink(document.querySelector('[data-section="news"]'));
    },
    goToAuth: function() {
        window.location.href = 'auth.html';
    }
};