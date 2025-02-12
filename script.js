function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

document.getElementById('register').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please log in.');
    showLoginForm();
});

document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('currentUser', username);

        showSecuredPage(username);
    } else {
        alert('Invalid username or password!');
    }
});

function showSecuredPage(username) {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('securedPage').style.display = 'block';
    document.getElementById('currentUser').textContent = username;
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    location.reload(); 
}

window.onload = function() {
    const loggedIn = localStorage.getItem('loggedIn');
    const currentUser = localStorage.getItem('currentUser');

    if (loggedIn && currentUser) {
        showSecuredPage(currentUser);
    } else {
        showLoginForm(); 
    }
};