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
    list.replaceChildren();
    for (const item of items)
    {
        const li = document.createElement("li");
        li.textContent = item.title;
        document.getElementById("list").append(li);
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
    load(); // Reload the list to include the new item
});