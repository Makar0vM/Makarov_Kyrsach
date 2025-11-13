document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница авторизации загружена');
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });
    
    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
    
    showLoginForm();
});

function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.querySelector('h1').textContent = 'Вход в систему';
}

function showRegisterForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.querySelector('h1').textContent = 'Регистрация';
}

function handleLogin() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    if (!login || !password) {
        showMessage('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    console.log('Попытка входа:', { login });
    
    showMessage('Выполняется вход...', 'info');
    
    setTimeout(() => {
        if (login.length >= 3 && password.length >= 3) {
            showMessage('Вход успешен! Добро пожаловать!', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('Неверный логин или пароль', 'error');
        }
        
        document.getElementById('login').value = '';
        document.getElementById('password').value = '';
    }, 1500);
}

function handleRegister() {
    const email = document.getElementById('regEmail').value;
    const login = document.getElementById('regLogin').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (!email || !login || !password || !confirmPassword) {
        showMessage('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Пароли не совпадают', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Введите корректный email', 'error');
        return;
    }
    
    console.log('Попытка регистрации:', { email, login });
    
    showMessage('Регистрация...', 'info');
    
    setTimeout(() => {
        showMessage('Регистрация успешна! Теперь вы можете войти.', 'success');
        
        setTimeout(() => {
            showLoginForm();
            
            document.getElementById('regEmail').value = '';
            document.getElementById('regLogin').value = '';
            document.getElementById('regPassword').value = '';
            document.getElementById('regConfirmPassword').value = '';
        }, 2000);
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(text, type) {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 4000);
}