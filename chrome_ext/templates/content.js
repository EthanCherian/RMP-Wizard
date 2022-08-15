console.log("Chrome extension working?");

let paragraphs = document.getElementsByTagName("p");

for(elt of paragraphs) {
    elt['background-color'] = '#FF00FF';
}