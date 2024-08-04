// Loads dynamic site info into appropriate spots

document.addEventListener("DOMContentLoaded", async function () {
  fetch("/assets/profile.json")
    .then((r) => r.json())
    .then((profile_json) => {
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

        document.getElementById("site-name").innerHTML = profile_json.site_name;
        //document.getElementById("date-today").innerHTML = utc;
        document.getElementById("name").innerHTML = profile_json.name;
        document.getElementById("email").innerHTML = profile_json.email;
        document.getElementById("email").href = `mailto: ${profile_json.email}`;
        document.getElementById("linkedin").href = profile_json.linkedin;
        document.getElementById("github").href = profile_json.github;
        document.getElementById("site-repo").href = profile_json.site_repo;
    })
    .catch((e) => {
      console.error("Could not load profile directory | Error: " + e);
    });
});
