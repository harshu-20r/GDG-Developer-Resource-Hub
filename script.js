let resources = JSON.parse(
    localStorage.getItem("gdgResources")
) || [

    {
        title: "MDN Web Docs",
        description: "Complete documentation for HTML, CSS and JavaScript.",
        link: "https://developer.mozilla.org/",
        category: "Web Dev"
    },

    {
        title: "React Documentation",
        description: "Official documentation for learning React.",
        link: "https://react.dev/",
        category: "Web Dev"
    },

    {
        title: "Google AI",
        description: "Learn about Google's AI tools and technologies.",
        link: "https://ai.google/",
        category: "AI/ML"
    },

    {
        title: "GitHub",
        description: "Platform for hosting and managing code projects.",
        link: "https://github.com/",
        category: "Tools"
    }
];


function saveResources() {

    localStorage.setItem(
        "gdgResources",
        JSON.stringify(resources)
    );

}


function displayResources() {

    const container =
        document.getElementById("resourceContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const category =
        document.getElementById("categoryFilter").value;


    container.innerHTML = "";


    const filteredResources = resources.filter(resource => {

        const matchesSearch =
            resource.title.toLowerCase().includes(search) ||
            resource.description.toLowerCase().includes(search);

        const matchesCategory =
            category === "All" ||
            resource.category === category;

        return matchesSearch && matchesCategory;

    });


    if (filteredResources.length === 0) {

        container.innerHTML =
            "<p>No resources found.</p>";

        return;

    }


    filteredResources.forEach((resource, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <span class="badge">
                ${resource.category}
            </span>

            <h3>
                ${resource.title}
            </h3>

            <p>
                ${resource.description}
            </p>

            <a href="${resource.link}"
               target="_blank">
               Visit Resource →
            </a>

            <br>

            <button
                class="delete-btn"
                onclick="deleteResource(${index})">
                Delete
            </button>

        `;

        container.appendChild(card);

    });

}


function addResource() {

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const link =
        document.getElementById("link").value;

    const category =
        document.getElementById("category").value;


    if (!title || !description || !link) {

        alert("Please fill all fields.");

        return;

    }


    resources.push({

        title: title,
        description: description,
        link: link,
        category: category

    });


    saveResources();

    displayResources();


    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("link").value = "";

}


function deleteResource(index) {

    resources.splice(index, 1);

    saveResources();

    displayResources();

}


document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        displayResources
    );


document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        displayResources
    );


document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        function () {

            document.body.classList.toggle("dark");

            if (
                document.body.classList.contains("dark")
            ) {

                this.innerText = "☀️ Light Mode";

            } else {

                this.innerText = "🌙 Dark Mode";

            }

        }
    );


displayResources();