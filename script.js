document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('textarea');
    const container = document.getElementById('container');
    
    const mirror = document.createElement('pre');
    mirror.classList.add('mirror');
    container.appendChild(mirror);

    // Функция копирования стилей
    const copyStyles = () => {
        const styles = window.getComputedStyle(textarea);
        ['border', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'padding', 'margin', 'whiteSpace', 'wordWrap']
            .forEach((prop) => mirror.style[prop] = styles[prop]);
        mirror.style.borderColor = 'transparent';
    };

    // Функция синхронизации текста с подсветкой
    const syncMirror = () => {
        // + \n чтобы рассинхрона не было с mirror
        mirror.innerHTML = Prism.highlight(textarea.value + "\n", Prism.languages.sql, 'sql');
        mirror.scrollTop = textarea.scrollTop;
    };

    // Функция вставки текста через execCommand
    const insertText = (text) => {
        document.execCommand('insertText', false, text);
    };

    // Функция комментирования строк через --
    const toggleLineComment = () => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // Определим строки с курсором и выделением
        const beforeCursor = value.substring(0, start);
        console.log("beforeCursor:", beforeCursor);
        // const afterCursor = value.substring(start, end);
        const afterSelection = value.substring(end);

        // Определяем начало и конец выделенных строк
        const lineStart = beforeCursor.lastIndexOf('\n') + 1;
        const lineEnd = afterSelection.indexOf('\n') !== -1 ? end + afterSelection.indexOf('\n') : value.length;

        // Получаем все строки в выделенной области
        const selectedLines = value.substring(lineStart, lineEnd).split('\n');

        // Проверяем, закомментированы ли все строки
        const allCommented = selectedLines.every(line => line.trim().startsWith('--'));

        let newText = '';
        let commentOffset = 0;

        if (allCommented) {
            // Если все строки закомментированы, убираем комментарии
            newText = selectedLines.map(line => line.replace(/^--\s?/, '')).join('\n');
            commentOffset = -3;  // Сдвиг назад на 3 символа (длина "-- ")
        } else {
            // Если не все строки закомментированы, добавляем комментарии
            newText = selectedLines.map(line => `-- ${line}`).join('\n');
            commentOffset = 3;  // Сдвиг вперёд на 3 символа (добавляем "-- ")
        }

        // Считаем количество строк
        const numLines = selectedLines.length;
        
        // Заменяем старый текст новым
        textarea.setSelectionRange(lineStart, lineEnd);
        insertText(newText);

        // Обновляем позицию курсора, чтобы сохранить исходное выделение
        const newStart = start + commentOffset;
        const newEnd = end + commentOffset * numLines;

        textarea.setSelectionRange(newStart, newEnd); // Сохраняем выделение
        syncMirror(); // Обновляем подсветку
    };

    // Событие для однострочного комментирования -- 
    textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault(); // Предотвращаем стандартное поведение
            toggleLineComment(); // Комментируем строки через --
        }

        // Обработка нажатия Tab для вставки 4 пробелов
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault(); // Предотвращаем стандартное поведение (переключение между элементами)

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Вставляем 4 пробела на место курсора или заменяем выделенный текст
            insertText('    ');

            // Обновляем позицию курсора после вставки
            textarea.setSelectionRange(start + 4, start + 4); // Ставим курсор после вставки 4 пробелов
        }

        // Обработка Shift + Tab для удаления 4 пробелов перед курсором
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault(); // Предотвращаем стандартное поведение

            const start = textarea.selectionStart;
            const value = textarea.value;

            // Определяем начало текущей строки (или предыдущей)
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineBeforeCursor = value.substring(lineStart, start);

            // Проверяем, есть ли перед курсором 4 пробела
            if (lineBeforeCursor.endsWith('    ')) {
                // Удаляем 4 пробела перед курсором
                textarea.setSelectionRange(lineStart + lineBeforeCursor.length - 4, start);
                insertText(''); // Заменяем 4 пробела на пустоту

                // Обновляем позицию курсора после удаления пробелов
                textarea.setSelectionRange(start - 4, start - 4);
            }
        }
    });

    // Подписка на события
    textarea.addEventListener('input', syncMirror);
    textarea.addEventListener('scroll', () => mirror.scrollTop = textarea.scrollTop);

    

    // Инициализация
    copyStyles();
    syncMirror();
});
