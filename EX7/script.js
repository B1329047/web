const container = document.getElementById("container");

// 新增一個變數，用來記錄連續打錯的次數
let mistakeCount = 0;

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
    container.textContent = getRandomLetters(0, 2);
};

// 處理按鍵事件
window.addEventListener("keyup", function(e) {
    let currentText = container.textContent;

    if (currentText.length > 0) {
        // 檢查按下的鍵是否和第一個字母相同
        if (e.key === currentText[0]) {
            // 【打對了】
            container.textContent = currentText.substring(1); // 消除第一個字
            mistakeCount = 0; // 連續錯誤中斷，計數器歸零
        } else {
            // 【打錯了】
            mistakeCount++; // 錯誤次數 +1
            console.log(`連續打錯次數: ${mistakeCount}`);
        }
    }

    // 1. 原本每次按鍵都會執行的：增加 1~3 個隨機字母
    add_new_chars();

    // 2. 檢查是否觸發懲罰機制：連續打錯 3 次
    if (mistakeCount >= 3) {
        console.log("觸發懲罰！額外增加 3 個字元");
        // 額外增加 3 個隨機字母
        container.textContent += getRandomLetters(3, 3);
        
        // 懲罰完畢後，可以選擇將錯誤計數歸零，重新計算下一個連續三次
        mistakeCount = 0; 
    }
});

function add_new_chars() {
    container.textContent += getRandomLetters(1, 3);
}