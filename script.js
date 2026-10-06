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

function applyLang(code) {
    const dict = DICT[code] || DICT["ru"]

    document.documentElement.lang = code

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const key = el.dataset.i18n
        if (dict[key] !== undefined) el.textContent = dict[key]
    })

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        const key = el.dataset.i18nPlaceholder
        if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key])
    })
}

langSelect.addEventListener("change", function () {
    applyLang(langSelect.value)
})

applyLang(langSelect.value)

Btn.addEventListener("click", function () {
    dialog.showModal()
})

// Кнопки внутри <form method="dialog"> закрывают окно сами.
// Их value попадает в dialog.returnValue, а введённые данные читаем через FormData.
dialog.addEventListener("close", function () {
    if (dialog.returnValue !== "Ok") return

    const data = new FormData(dialog.querySelector("form"))
    console.log(Object.fromEntries(data.entries()))
    // Здесь будет добавление заметки в таблицу
})
