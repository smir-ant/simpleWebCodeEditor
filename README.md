# <ins>Простой</ins> <ins>крошечный</ins> <ins>встраиваемый</ins> редактор кода для <ins>любого языка</ins>

###### построено поверх <a href="https://prismjs.com/">prism.js</a>

###### без npm и node.js 🗑️


<details>
<summary>
<picture><img src="https://img.shields.io/badge/общий вес-7.7kB-blue.svg"></picture>
</summary>
<!-- Разграничитель -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/84059957/215088292-cf50a16b-422b-43cc-a211-c4169553ca62.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/84059957/210322548-b635bad5-c53d-4209-a73e-fb0adcc437bf.png">
    <img height="0.8">
  </picture>

  Из которых 5.5kB это prism (хоть на сайте и говорится про 2-2.5kb, ага)

  Но всяко лучше, чем например <a href="https://highlightjs.org/">higlihts.js</a> с их .min весом 36kB. И это только для подсветки, мдыы...
  
  Вес всех файлов после минификаций:

  <picture><img src="assets/img.png"></picture>


<!-- Окончание -->
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/84059957/215088776-b06bbe95-42fd-4d78-bcae-70cdbeebbbd3.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/84059957/210319906-4f1e79cb-1a45-4e5c-93e9-ae21e197e0b9.png">
    <img>
  </picture>
</details>

### Суть

`textarea` с `pre` тегом поверх, который абсолютно точно дублирует и красит содержимое.

### Функционал:

- Подсветка любого языка. Как поменять? 
    - изменить ссылку в index.html (prism-sql.min.js) 
    - поменять sql на ваш язык внутри scripts.min.js</sub>
- Поддержка <kbd>Tab</kbd> и <kbd>Shift+Tab</kbd>
- Поддержка undo/redo. <sub>Хоть и за счёт использования execCommand, который считается deprecated. Однако аналогов пока нет (<a href="https://github.com/fregante/indent-textarea/issues/30">подробнее</a>). А свою микросистему с памятью через самодельный стек сомнительно внедрять...</sub>
- Поддержка resize <sub>(убери resize:none из css)</sub>
- Богатая система типов:

| Класс            | Что это             | Пример(sql) |
|------------------|---------------------|-------------|
| `.comment`       | Комментарии         | --abc       |
| `.string`        | Строки              | "abc"       |
| `.keyword`       | Ключевые слова      | SELECT      |
| `.variable`      | Переменные          | @age        |
| `.punctuation`   | Пунктуация          | ()          |
| `.number`        | Числа               | 123         |
| `.operator`      | Оператор            | BETWEEN     |
| `.boolean`       | Булевое значение    | FALSE       |
| `.function`      | Функции             | COUNT(      |
---

###### js uglified via https://www.uglifyjs.net/
 
###### css minified via https://www.uglifycss.com/
