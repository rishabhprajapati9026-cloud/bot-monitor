async function addProject() {
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;

    await fetch("/api/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, url })
    });

    loadProjects();
}

async function loadProjects() {
    const data = await fetch("/api/list");
    const projects = await data.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    projects.forEach(p => {
        list.innerHTML += `
        <div class="project">
            <b>${p.name}</b><br>
            ${p.url}
        </div>`;
    });
}

loadProjects();
