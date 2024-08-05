async function load_page_content() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");

    let markdown = await fetch("assets/pages.json")
        .then((r) => r.json())
        .then((articles_json) => {
            return articles_json;
        })
        .catch((e) => {
            console.error("Failed to load article directory");
        });

    // Handling cases
    if (page === null || page === "home") {
        populate_selection_list(markdown);

    } else if (page === "about_me") {
        load_markdown(markdown.about_me.src);
    } else if (page == "articles") {
        const article_name = urlParams.get("article");
        if (article_name == null) {
            load_markdown(markdown.article_select.src);
            populate_selection_list(markdown);
        } else {
            load_markdown(markdown.articles[article_name].src);
            populate_article_info(markdown.articles[article_name]);
        }
    }
}

// Loads content from some URL
function load_markdown(url) {
    fetch(url)
        .then((r) => r.text())
        .then((text) => {
            document.getElementById("markdown").innerHTML = marked.parse(text);
            hljs.highlightAll();
        });
}

// Fills up select felids in selection lists
function populate_selection_list(markdown) {
    document.getElementById("list-mask").style.setProperty("display", "block");

    const featured_list = document.getElementById("featured-list");
    const regular_select_list = document.getElementById("regular-select-list");
    markdown.featured.forEach((name) => {
        featured_list.appendChild(create_item(name, markdown.articles[name]));
    });

    Object.entries(markdown.articles)
        .sort((a, b) => {
            return new Date(b[1].time_added) - new Date(a[1].time_added);
        })
        .forEach(([name, data]) => {
            regular_select_list.appendChild(create_item(name, data));
        });

    function create_item(name, data) {
        // Creating selection box tag
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.innerHTML = `Tag: ${data.tags[0]}`;

        // Creating selection box date
        const date = document.createElement("span");
        date.className = "date";
        date.innerHTML = `~${data.time_added}~`;

        // Putting it into a meta element
        const meta_data = document.createElement("div");
        meta_data.appendChild(tag);
        meta_data.appendChild(date);

        // Adding a hr element
        const hr = document.createElement("hr");

        // Creating a content box
        const content = document.createElement("h4");
        content.innerHTML = name;

        // Putting it all into a list item, clickable
        const li = document.createElement("li");
        li.appendChild(meta_data);
        li.appendChild(hr);
        li.appendChild(content);
        li.setAttribute(
            "onclick",
            `window.location.href = 'articles.html?page=articles&article=${name}';`
        );
        return li;
    }
}

// Fills out article info section
function populate_article_info(article) {
    document.getElementById("info-mask").style.setProperty("display", "block");
    document.getElementById("article-tags").innerHTML = format_tags(article.tags);
    document.getElementById(
        "article-date"
    ).innerHTML = `Created: ${article.time_added}`;
}

function format_tags(tags) {
    if (tags.length == 0) {
        return "Tags: None";
    }
    let header = "Tags:";
    if (tags.length == 1) {
        header = "Tag:";
    }
    return `${header} ${tags.join(", ")}`;
}

document.addEventListener("DOMContentLoaded", async function() {
    load_page_content();
});
