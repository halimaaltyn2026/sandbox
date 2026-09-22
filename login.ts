
// 1. Создаем строгий интерфейс (своего рода "паспорт" или шаблон для пользователя)
interface User {
    id: number;
    name: string;
    role: 'admin' | 'user' | 'guest'; // Роль может быть строго одной из этих трех строк
    email: string;
}

// 2. Указываем функции, что аргумент 'user' должен строго соответствовать нашему интерфейсу 'User'
function getWelcomeMessage(user: User): string { // ': string' означает, что функция обязательно вернет строку
    if (user.role === 'admin') {
        return `Добро пожаловать, Администратор ${user.name}! Доступ к панели открыт.`;
    } else if (user.role === 'user') {
        return `Привет, ${user.name}! Твой аккаунт (${user.email}) успешно авторизован.`;
    } else {
        return `Здравствуйте, Гость! Пожалуйста, проверьте данные.`;
    }
}

// 3. Работа с DOM-элементами. Добавляем "| null", так как элементы могут не найтись на странице
const form = document.querySelector('form') as HTMLFormElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null; 

// Делаем обязательную проверку: код выполнится только если ВСЕ элементы успешно нашлись
if (form && emailInput) {
    
    form.addEventListener('submit', (e: Event) => { 
        e.preventDefault();

        // Убираем лишние пробелы по краям
        const emailValue = emailInput.value.trim();

        // Явно указываем типы для переменных
        let assignedRole: 'admin' | 'user' | 'guest' = 'user';
        let userName: string = 'Пользователь';

        // Теперь логика корректно обрабатывает пустой email как гостя!
        if (!emailValue) {
            assignedRole = 'guest';
            userName = 'Гость';
        } else if (emailValue === 'admin@test.com') {
            assignedRole = 'admin';
            userName = 'Халима (Админ)';
        }

        // 4. Создаем объект и связываем его с типом : User
        const currentUser: User = {
            id: Date.now(), 
            name: userName,
            role: assignedRole,
            email: emailValue
        };

        // Выводим сообщение
        alert(getWelcomeMessage(currentUser));
    });
}
