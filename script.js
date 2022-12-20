let modalwelcome = document.getElementById('modalWelcome');
let modalMin = document.getElementById('modalMin');
let modalMax = document.getElementById('modalMax');
let modalStart = document.getElementById('modalStart');
let modalTextStart = document.getElementById('modalTextStart');

let closeModWelcome = document.getElementById('btnWelcome');
let closeModMin = document.getElementById('btnMin');
let closeModMax = document.getElementById('btnMax');
let closeModStart = document.getElementById('btnStart');

let minValue;
let maxValue;

closeModWelcome.onclick = function() { 
    modalwelcome.classList.add('modalStep1');
    modalMin.classList.add('modalStep2');
    
}  

closeModMin.onclick = function(event) {
    event.preventDefault();
    minValue = parseInt(document.getElementById("minValue").value) || 0;
    minValue = (minValue < -999) ? -999 : minValue;
    if (Number.isNaN(minValue)){
        minValue = 0;   
    } 

    modalMin.classList.remove('modalStep2'); 
    modalMax.classList.add('modalStep3'); 
}   

closeModMax.onclick = function(event) {
    event.preventDefault();
    maxValue = parseInt(document.getElementById("maxValue").value) || 100;
    maxValue = (maxValue > 999) ? 999 : maxValue;
    if (Number.isNaN(maxValue)) {
        maxValue = 100;
    } else if (maxValue  < minValue ){
        minValue = 0;
        maxValue = 100;
    }
modalTextStart.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
modalMax.classList.remove('modalStep3'); 
modalStart.classList.add('modalStep4');


closeModStart.onclick = function() {
    modalStart.classList.remove('modalStep4');
    game();   
}
}     

function game () {
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;

let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
let secondTeens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

function numbersInText() { 
    let number = Math.abs(answerNumber);
    let text = '';

    if (number == 0) {
        text = 'ноль';
        return text;
    }

    if (number <= 9) {
        return units[Math.floor(Math.abs(number) / 1)];
    }

    if (number > 9 && number < 20) {
        return teens[Math.floor(number / 10 + number % 10)];
    }

    if (number >= 20 && number <= 99) {
        return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
    }

    if (number >= 100 && number <= 999) {
        return hundreds[Math.floor(number / 100)] + " " + numbersInTextHundreds();
    }

}

function numbersInTextHundreds() { 
    let unitsTeensDozens = Math.abs(answerNumber) % 100;

    if (unitsTeensDozens <= 9) {
        return units[Math.floor(unitsTeensDozens / 1)];
    }

    if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
        return secondTeens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
    }

    if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
        return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
    }
}

function answerText(){
if(numbersInText().length < 20 && answerNumber >= 0){
    answerField.innerText = ` ${numbersInText()}?` 
    return answerField.innerText;
    
    }
    else if (numbersInText().length < 20 && answerNumber < 0){
    answerField.innerText = ` минус ${numbersInText()}?` 
    return answerField.innerText;
    }

    else if (numbersInText().length > 20){
    answerField.innerText = ` ${answerNumber}?` 
    return answerField.innerText;
    }
}
answerField.innerText = `Вы загадали число ${answerText()}`

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round (Math.random()*3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `К сожалению, вы загадали неправильное число!\n\u{2639}`
                    break;
                case 1:
                    answerPhrase = `Что-то пошло не так, давайте попробуем снова!`
                    break;
                case 2:
                    answerPhrase = `Вы загадали не число?!\n\u{1F914}`
                    break;
                case 3:
                    answerPhrase = `Не верно!`
                    break;
                }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round (Math.random()*2);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Возможно ты загадал ${answerText() }?`
                    break;
                case 1:
                    answerPhrase = `Думаю ты загадал ${answerText() }?`
                    break;
                case 2:
                    answerPhrase = `Вероятно это число ${answerText() }?`
                    break;
                }
                answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || minValue == answerNumber){
            const phraseRandom = Math.round (Math.random()*3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `К сожалению, вы загадали неправильное число!\n\u{2639}`
                    break;
                case 1:
                    answerPhrase = `Что-то пошло не так, давайте попробуем снова!`
                    break;
                case 2:
                    answerPhrase = `Вы загадали не число?!\n\u{1F914}`
                    break;
                case 3:
                    answerPhrase = `Не верно!`
                    break;
                }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 2); 
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Возможно ты загадал ${answerText() }?`
                    break;
                case 1:
                    answerPhrase = `Думаю ты загадал ${answerText() }?`
                    break;
                case 2:
                    answerPhrase = `Вероятно это число ${answerText() }?`
                    break;
                }
                answerField.innerText = answerPhrase;
            }
    }
})


document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round (Math.random()*3);
        switch (phraseRandom) {
            case 0:
                answerPhrase = `К сожалению, вы загадали неправильное число!\n\u{2639}`
                break;
            case 1:
                answerPhrase = `Что-то пошло не так, давайте попробуем снова!`
                break;
            case 2:
                answerPhrase = `Вы загадали не число?!\n\u{1F914}`
                break;
            case 3:
                answerPhrase = `Не верно!`
                break;
            }
       
        gameRun = false;
    } else {
        maxValue = answerNumber  - 1;
        answerNumber  = Math.floor((minValue + maxValue) / 2);
        orderNumber++;
        orderNumberField.innerText = orderNumber;
        const phraseRandom = Math.round(Math.random() * 3); 
        switch (phraseRandom) {
            case 0:
                answerPhrase = `Я всегда угадываю \n\u{1F60E}`
                break;
            case 1:
                answerPhrase = `Ту-туру-туту ! \n\u{1F38A}\n\u{1F389}\n\u{1F38A}`
                break;
            case 2:
                answerPhrase = `Я просто волшебник! \n\u{2728}`
                break;
            case 3:
                answerPhrase = `Я все вижу и все знаю \n\u{1F913}`
                break;
            }
            answerField.innerText = answerPhrase;
        gameRun = false;
    }
})


 
document.getElementById('btnRetry').addEventListener('click', function () {
    document.getElementById('minValue').value = "";
    document.getElementById('maxValue').value = "";
    modalwelcome.classList.add('modalStep1');
    modalMin.classList.add('modalStep2');
   })

    closeModMin.onclick = function(event) {
        event.preventDefault();
        minValue = parseInt(document.getElementById("minValue").value) || 0;
        minValue = (minValue < -999) ? -999 : minValue;
        if (Number.isNaN(minValue)){
            minValue = 0;   
        } 
    
        modalMin.classList.remove('modalStep2'); 
        modalMax.classList.add('modalStep3'); 
    }   
    
    closeModMax.onclick = function(event) {
        event.preventDefault();
        maxValue = parseInt(document.getElementById("maxValue").value) || 100;
        maxValue = (maxValue > 999) ? 999 : maxValue;
        if (Number.isNaN(maxValue)) {
            maxValue = 100;
        }
        if (maxValue  < minValue ){
            minValue = 0;
            maxValue = 100;
        }
    modalTextStart.textContent = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    modalMax.classList.remove('modalStep3'); 
    modalStart.classList.add('modalStep4');
    
    
    closeModStart.onclick = function() {
        modalStart.classList.remove('modalStep4');
        game();   
    }
    }     


}

