// Loads dynamic site info into appropriate spots

document.addEventListener("DOMContentLoaded", async function () {
  fetch("/assets/profile.json")
    .then((r) => r.json())
    .then((profile_json) => {
      var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

      replace_inner_html("site-name", profile_json.site_name);
      replace_inner_html("name", profile_json.name);

      replace_inner_html("email", profile_json.email);
      replace_href("email", `mailto: ${profile_json.email}`);
      replace_href("github", profile_json.github)
      replace_href("linkedin", profile_json.linkedin)
      replace_href("site-repo", profile_json.site_repo)

      replace_inner_html("date-today", utc)
    })
    .catch((e) => {
      console.error("Could not load profile directory | Error: " + e);
    });
});

function replace_inner_html(id, val) {
  document.querySelectorAll("#" + id).forEach((elem) => {
    elem.innerHTML = val;
  });
}

function replace_href(id, val) {
  document.querySelectorAll("#" + id).forEach((elem) => {
    elem.href = val;
  });
}
