export default function (element) {
    element.style.overflow = "hidden";

    if (element.className === "hero0-main-description") {
        element.innerHTML = element.innerText
        .split("")
        .map((char) => {
            if(char === " ") {
                return `<span>&nbsp</span>`;
            } else {
                return `<span class="animated2">${char}</span>`;
            }
        })
        .join("");
    } else {
        element.innerHTML = element.innerText
        .split("")
        .map((char) => {
            if(char === " ") {
                return `<span>&nbsp</span>`;
            } else {
                return `<span class="animated">${char}</span>`;
            }
        })
        .join("");

    }

    return element;
}