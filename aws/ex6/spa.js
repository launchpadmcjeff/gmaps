console.log("initing...");
console.log(location.hash);
window.addEventListener("hashchange", function () { navigate() });
if (!location.hash) {
    console.log("location is null setting to #home");
    location.hash = "#home";
}
navigate();


function getContentXmlRpc(fragmentId, callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    }

    request.open("GET", fragmentId + ".html");
    request.send(null);

}

function getContent(fragmentId, callback) {
    var partials = {
        home: "Welcome to the site",
        about: "This is the about page",
        contact: "This is the contact page"
    }
    callback(partials[fragmentId]);
}

function navigate() {

    var contentDiv = document.getElementById("content");

    fragmentId = location.hash.substring(1);

    // contentDiv.innerHTML = getContent(fragmentId);
    getContent(fragmentId, function (content) {
        contentDiv.innerHTML = content;
    });

    setActiveLink(fragmentId);
}

function setActiveLink(fragmentId) {
    var navbarDiv = document.getElementById("navbar"),
        links = navbarDiv.children,
        //links = document.querySelectorAll("#navbar a"),
        i, link, pageName;

    for (i = 0; i < links.length; i++) {
        link = links[i];
        pageName = link.getAttribute("href").substr(1);
        if (pageName == fragmentId) {
            link.setAttribute("class", "active");
        } else {
            link.removeAttribute("class");
        }
    }


}