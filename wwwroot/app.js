const form = document.getElementById("addForm");
const titleInput = document.getElementById("newTitle");

async function load() {
    const response = await fetch('/api/todo');
    const items = await response.json();
    console.log(items);
    render(items);
}

load();

function render(items) {
    const list = document.getElementById("list");
    list.replaceChildren();
    for (const item of items)
    {
        const li = document.createElement("li");
        li.textContent = item.title;
        list.append(li);
    }
}

function remove(items) {
    const list = document.getElementById("list");
    for (const item of items) {
        const li = document.createElement("li");
        li.textContent = item.title;
        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", () => remove(item));
        li.append(del);
        list.append(li);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch('/api/todo', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleInput.value, isCompleted: false })
    });

    const created = await response.json();
    titleInput.value = "";
    load(); // Reload the list to include the new item

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => remove(item));
});