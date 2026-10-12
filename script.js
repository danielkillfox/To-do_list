
const Btn = document.querySelector("#addbtn")

const dialog = document.querySelector("#addwindow")

const langSelect = document.querySelector("#language")


// Словарь подписей. Ключи data-i18n / data-i18n-placeholder из tasks.html
const DICT = {
    "ru": {
        product_name: "Название продукта",
        tagline: "Не забывай. Что для тебя важно",
        add_new: "Добавить новое",
        label_ph: "Название",
        note_ph: "Заметка",
        cancel: "Отмена", 
        add: "Добавить" 
    },

    "en-US": {
        product_name: "Name of Product",
        tagline: "Dont Forget.What important to you",
        add_new: "Add New",
        label_ph: "Label",
        note_ph: "Note",
        cancel: "Cancel",
        add: "Add"
    },
    "en-GB": {
        product_name: "Name of Product",
        tagline: "Dont Forget.What important to you",
        add_new: "Add New",
        label_ph: "Label",
        note_ph: "Note",
        cancel: "Cancel",
        add: "Add"
    }
}

// ===== Шаг 2. Функция-переводчик =====
// code = какой язык выбрали, например "ru". Функция меняет все тексты на странице на этот язык
function applyLang(code) {
    // Достаём нужный разговорник. Если такого языка нет, на всякий случай берём русский: DICT["ru"]
    const dict = DICT[code] || DICT["ru"]

    // Меняем язык всей страницы, чтобы браузер знал (важно для переводчиков и чтения вслух)
    document.documentElement.lang = code

    // Находим ВСЕ штуки с ярлычком data-i18n (обычный текст: заголовки, кнопки)
    // и заменяем их текст на перевод из словаря
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const key = el.dataset.i18n // Читаем ярлычок, например "add_new"
        if (dict[key] !== undefined) el.textContent = dict[key] // Если перевод есть, вставляем его
    })

    // То же самое, но для бледных подсказок внутри полей ввода (placeholder)
    // Они хранятся не в тексте, а в свойстве placeholder, поэтому меняем по-другому
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        const key = el.dataset.i18nPlaceholder // Читаем ярлычок, например "label_ph"
        if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key])
    })
}

// ===== Шаг 3. Слушаем смену языка =====
// addEventListener("change") = "сиди и жди, когда человек выберет другой язык в списке,
// а как выберет — запусти перевод"
langSelect.addEventListener("change", function () {
    applyLang(langSelect.value) // langSelect.value = то, что выбрали, например "en-US"
})

// Переводим страницу сразу при открытии, чтобы язык совпал с тем, что выбрано в списке по умолчанию
applyLang(langSelect.value)

// ===== Шаг 4. Открываем окошко по кнопке =====
// "Когда нажмут на главную кнопку Btn — покажи всплывающее окно dialog"
Btn.addEventListener("click", function () {
    dialog.showModal() // showModal() = встроенная команда браузера "покажи <dialog> поверх всего"
})

// ===== Шаг 5. Что делать, когда окошко закрылось =====
// Кнопки внутри <form method="dialog"> закрывают окно сами.
// Их value попадает в dialog.returnValue, а введённые данные читаем через FormData.
dialog.addEventListener("close", function () {
    // returnValue = какую кнопку нажали. Если НЕ "Ok" (нажали Отмену или крестик) — ничего не делаем, выходим
    if (dialog.returnValue !== "Ok") return

    // Собираем всё, что человек ввёл в окошко (дата, название, заметка, галочка) в виде таблицы "имя -> значение"
    const data = new FormData(dialog.querySelector("form"))
    // Пока просто показываем это в консоли браузера (F12 -> Console), чтобы проверить
    console.log(Object.fromEntries(data.entries()))
    // Здесь будет добавление заметки в таблицу
})
