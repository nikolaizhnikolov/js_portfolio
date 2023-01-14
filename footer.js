export const footer = (function () {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const text = document.createElement("p");
    text.classList.add("footer__text");
    text.textContent = "Copyright © 2022 nikolaizhnikolov";

    const link = document.createElement("a");
    link.href = "https://github.com/nikolaizhnikolov";

    const linkImage = document.createElement("img");
    linkImage.classList.add("footer__image");
    linkImage.src = "../images/github.png";
    linkImage.alt = "Github";

    link.appendChild(linkImage);
    footer.appendChild(text);
    footer.appendChild(link);

    return footer;
})();
