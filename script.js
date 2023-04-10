const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const slider = document.getElementById("length");
const output = document.getElementById("demo");
const strength = document.getElementById("strength-progress");


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Generate password function
function generatePassword() {
	const length = +lengthEl.value;
	const lower = lowercaseEl.checked;
	const upper = uppercaseEl.checked;
	const number = numbersEl.checked;
	const symbol = symbolsEl.checked;	

	// Clear input 
	resultEl.innerHTML = '';

	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Filter out unchecked types
	if(typesCount === 0) {
		return '';
	}
	
	// Loop over length call generator for each type
	for(let i=0; i<length; i+=1) {
		type = typesArr[Math.floor(Math.random()*typesCount)]
		const funcName = Object.keys(type)[0];
		generatedPassword += randomFunc[funcName]();
	}	
	const finalPassword = generatedPassword.slice(0, length);
	
	// Color
	var i=0;
	var character='';
	while (i <= finalPassword.length-1){
		character = finalPassword.charAt(i);
		if (character.match(/^[^a-zA-Z0-9]+$/)){
			var symbolChara = document.createElement('span')
			symbolChara.innerHTML = character;
			symbolChara.style.color = 'red';
			resultEl.appendChild(symbolChara);
		} else if (!isNaN(character * 1)) {
			var numberChara = document.createElement('span')
			numberChara.innerHTML = character;
			numberChara.style.color = 'blue';
			resultEl.appendChild(numberChara);
		} else if (character == character.toUpperCase()) {
			var letterUpperChara = document.createElement('span')
			letterUpperChara.innerHTML = character;
			letterUpperChara.style.color = 'green';
			resultEl.appendChild(letterUpperChara);
		} else if (character == character.toLowerCase()) {
			var letterLowerChara = document.createElement('span')
			letterLowerChara.innerHTML = character;
			letterLowerChara.style.color = 'black';
			resultEl.appendChild(letterLowerChara);
		} 
		i++;
	}


	// Update strength bar, simple Algo
	if (length>=12 && 
		hasLower(finalPassword) && hasUpper(finalPassword) &&
		hasNumber(finalPassword) && hasSymbols(finalPassword)){
		strength.style.background = "#37a47c"
		strength.style.width = "100%"
	} else if (length<8 || typesArr.length<3) {
		strength.style.background = "#d51a1a";
		strength.style.width = "33%"
	} else {
		strength.style.background = "#d75b00";
		strength.style.width = "66%"
	}
}

// Check if at Least one for strength bar
function hasLower(str){
	return /[a-z]/g.test(str);
}
function hasUpper(str){
	return /[A-Z]/g.test(str);
}
function hasNumber(str) {
	return /\d/.test(str);
}
function hasSymbols(str) {
	return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

// Generator functions - http://www.net-comber.com/charset?html
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = '@&$!#?'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Checkbox
function checkedCheckbox() {
	uppercaseEl.disabled = uppercaseEl.checked && !(lowercaseEl.checked || numbersEl.checked);
	lowercaseEl.disabled = lowercaseEl.checked && !(numbersEl.checked || uppercaseEl.checked);
	numbersEl.disabled = numbersEl.checked && !(uppercaseEl.checked || lowercaseEl.checked);
}

// EventListener
generate.addEventListener('click', () => {
	generatePassword()
});
slider.oninput = function() {
	generatePassword()	
	output.innerHTML = this.value;
}  
uppercaseEl.addEventListener('click', () => {
	generatePassword()
	checkedCheckbox()
});
lowercaseEl.addEventListener('click', () => {
	generatePassword()
	checkedCheckbox()
});
numbersEl.addEventListener('click', () => {
	generatePassword()
	checkedCheckbox()
});
symbolsEl.addEventListener('click', () => {
	generatePassword()
	checkedCheckbox()
});
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
});
clipboard.addEventListener("click", () => {
    if(! clipboard.classList.contains("animation-bounce")){
        clipboard.classList.add("animation-bounce");
        setTimeout(() => {
            clipboard.classList.remove("animation-bounce");
        },1000)
    }
})
generateEl.addEventListener("click", () => {
    if(! generateEl.classList.contains("animation-spin")){
        generateEl.classList.add("animation-spin");
        setTimeout(() => {
            generateEl.classList.remove("animation-spin");
        },1000)
    }
})


output.innerHTML = slider.value;
generatePassword();
checkedCheckbox();