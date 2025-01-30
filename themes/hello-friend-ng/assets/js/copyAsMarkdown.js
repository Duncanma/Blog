const hasMarkdown = "hasMarkdown";
const copySpans = document.querySelectorAll(".copyAsMarkdown");

let markdownLink = null;
const markdownLinks = document.head.querySelectorAll("link[type='text/markdown']");
if (markdownLinks && markdownLinks.length > 0) {
    markdownLink = markdownLinks[0].getAttribute("href");
}

if (markdownLink) {
    document.body.classList.add(hasMarkdown);
}
else {
    document.body.classList.remove(hasMarkdown);
}

copySpans.forEach(element => {
    element.onclick = function(e) {
        e.preventDefault();
        fetch(markdownLink)
            .then(response => response.text())
            .then(markdown => navigator.clipboard.writeText(markdown));
        return false;
    }

});
