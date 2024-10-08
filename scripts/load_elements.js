// Loads html snippets from external sources

document.addEventListener("DOMContentLoaded", async function () {
    async function load_navbar() {
        const navbar = await fetch("elements/navbar.html");
        const text = await navbar.text();

        document.querySelectorAll("#navbar").forEach((element) => {
            element.innerHTML = text;
        });
    }

    async function load_footer() {
        const footer = await fetch("elements/footer.html");
        const text = await footer.text();

        document.querySelectorAll("#footer").forEach((element) => {
            element.innerHTML = text;
        });
    }

    load_navbar();
    load_footer();
});