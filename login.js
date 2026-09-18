


// Функция для создания приветственного сообщения
function getWelcomeMessage(user) {
    if (user.role === 'admin') {
        return `Добро пожаловать, Администратор ${user.name}! Доступ к панели открыт.`;
    } else if (user.role === 'user') {
        return `Привет, ${user.name}! Твой аккаунт (${user.email}) успешно авторизован.`;
    } else {
        return `Здравствуйте, Гость! Пожалуйста, проверьте данные.`;
    }
}

// Ваш рабочий код для формы
const form = document.querySelector('form');
const email = document.getElementById('email');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Представим, что если почта admin@test.com, то заходит админ, а если любая другая — обычный юзер
    let assignedRole = 'user';
    let userName = 'Пользователь';

    if (email.value === 'admin@test.com') {
        assignedRole = 'admin';
        userName = 'Халима (Админ)';
    }

    // Создаем объект пользователя по нашему строгому интерфейсу User!
    const currentUser = {
        id: Date.now(), // Уникальный ID на основе времени
        name: userName,
        role: assignedRole,
        email: email.value
    };

    // Выводим сообщение, сгенерированное функцией
    alert(getWelcomeMessage(currentUser));
});
