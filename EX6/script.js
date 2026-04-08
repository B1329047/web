const container = document.getElementById("container");


function getRandomLetters(min, max) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let result = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    return result;
}

window.onload = function() {
    container.innerText = getRandomLetters(0, 2);
};


window.addEventListener("keyup", function(e) {
    
    let currentText = container.innerText;

    if (currentText.length > 0 && e.key === currentText[0]) {
        container.innerText = currentText.substring(1);
    }

    add_new_chars();
});


function add_new_chars() {
    container.innerText += getRandomLetters(1, 3);
}