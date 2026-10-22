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

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", async () => {
            const response = await fetch(`/api/todo/${item.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                load(); // Reload the list to reflect the deletion
            }
        });
        li.append(del);

        const updated = document.createElement("input");
        updated.type = "checkbox";
        updated.checked = item.isCompleted;
        updated.addEventListener("change", async (event) => {
            const response = await fetch(`/api/todo/${item.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...item, isCompleted: event.target.checked })
            });
            if (response.ok) {
                load(); // Reload the list to reflect the update
            }
        });
        li.append(updated);
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
    load(); //Reload the list to include the new item
});