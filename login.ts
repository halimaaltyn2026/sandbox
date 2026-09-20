// 1. Создаем строгий интерфейс (своего рода "паспорт" или шаблон для пользователя)
// Теперь TypeScript будет строго следить, чтобы у каждого пользователя были именно эти свойства и правильные типы данных
interface User {
    id: number;
    name: string;
    role: 'admin' | 'user' | 'guest'; // Роль может быть строго одной из этих трех строк
    email: string;
}

// 2. Указываем функции, что аргумент 'user' должен строго соответствовать нашему интерфейсу 'User'
function getWelcomeMessage(user: User): string { // ': string' в конце означает, что функция обязательно вернет строку
    if (user.role === 'admin') {
        return `Добро пожаловать, Администратор ${user.name}! Доступ к панели открыт.`;
    } else if (user.role === 'user') {
        return `Привет, ${user.name}! Твой аккаунт (${user.email}) успешно авторизован.`;
    } else {
        return `Здравствуйте, Гость! Пожалуйста, проверьте данные.`;
    }
}

// 3. Работа с DOM-элементами в TypeScript требует явного указания типов элементов
// Мы используем "as HTMLFormElement", чтобы TS точно знал, какими свойствами обладает эта форма
const form = document.querySelector('form') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement; // HTMLInputElement дает доступ к свойству .value

form.addEventListener('submit', (e: Event) => { // Указываем тип события — Event
    e.preventDefault();

    // Явно указываем типы для переменных (хотя TS умеет угадывать их сам, при обучении полезно писать их вручную)
    let assignedRole: 'admin' | 'user' | 'guest' = 'user';
    let userName: string = 'Пользователь';

    if (email.value === 'admin@test.com') {
        assignedRole = 'admin';
        userName = 'Халима (Админ)';
    }

    // 4. Создаем объект и связываем его с типом : User
    // Если ты забудешь указать email или напишешь вместо id строку, TS сразу подсветит это как ошибку!
    const currentUser: User = {
        id: Date.now(), 
        name: userName,
        role: assignedRole,
        email: email.value
    };

    // Выводим сообщение
    alert(getWelcomeMessage(currentUser));
});
