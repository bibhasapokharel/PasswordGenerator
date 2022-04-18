// PASSWORD GENERATOR

//Character generator function
//Function that accepts a string value as an argument and return a random index number from the string argument

function randomIndex(str){
    return Math.floor(Math.random()* str.length);
}

//ex. randomIndex function

console.log(randomIndex(`chicken`));//0 to 6

//Function that returns a random lowercase letter using a random index in the letter str

function getRandomLower (){
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    //Returning randomletter using a random Index in the letter's string
    return letters[randomIndex(letters)];
}

// Ex. of the getRandomLower ()

console.log(getRandomLower());//random lower case letter

//Function that returns a randomUpper letter

function getRandomUpper(){
    //Running the getRandomLower function to create a random lowerCase letter
   const letter = getRandomLower();
   //changing the random lowercase letter to uppercase letter and returning it form function
   return letter.toUpperCase();
}

console.log(getRandomUpper());//random uppercase letter

//function that returns a random numbaer (aka random number as string value)

function getRandomNumber () {
    const numbers = `1234567890`;
    //returning a random number using a randomIndex from the numbers str

    return numbers[randomIndex(numbers)];
}
console.log(getRandomNumber());//random number 

//function that returns a randomSymbol

function getRandomSymbol () {
    const symbol = `!@#$%^&*(){}[]=<>/,.`;
    //returning a random symbol using a random index 
    return symbol[randomIndex(symbol)];
}

console.log(getRandomSymbol());

//Object to store all the characters generator functions
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol

};

// Select the DOM elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const loweCaseEl = document.querySelector(`#lowercase`);
const upperCaseEl = document.querySelector(`#uppercase`);
const numberEl = document.querySelector(`#numbers`);
const symbolEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

//Generator password Function (function that accepts true or false values as well as a number argument)
//NOTE the checkbox inputs and number (aka length) input will determine the values/arguments entered into this function

function generatePassword (lower, upper, number, symbol, length){
    //1. Create the password variable
    let generatedPassword = ``;
    //2. filter out unchecked options
    //True and false values can be added together (true =1 & false=0)
    //NOTE the values set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    //If the user has not selected any of the 4 options, the alert will be displayed and an empty string will be returned from the function so teh password displays to teh user wil be an empty string

    if(typesCount === 0){
        alert(`Please select at least one option`);
        //the Return keyword stops/ends the execution of a function (aka does NOT run any of the lines of code follow the return in teh function)
        return ``;

        //Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunciton object. Also. the second items in each nested array are of the values passed into this generatePassword function

    }
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];
    console.log(typesArr);

    //The filter method creates a new array with all the items that "pass the test" by the provided function (aka all the items that cause the function to return a boolean value of true when teh function is run using the item as the argument for the item parameter in this ex)
    //Checking if the value for index of 1 in each (aka array) in the typesArr array is true or false. Also, removing the item from the typesArr array if its false

    typesArr = typesArr.filter(item => {
        console.log(item[1]);
        return item[1];
    });

    //3. Loop over the length and call the generator function forEach checked option
    //building password with a for loop
    //NOTE value for length is the value entered/selected lengthEl

    for(i=0; i<length; i+= typesCount){
        //One of the items in the updated/filtered version of the typesArr will be the value/argument passed in for the types pareameter each time the anonymous function is run
        typesArr.forEach(type => {
            const funcName = type[0];
            console.log(funcName);
            //Accessing and running/ executing a function in the randomFunction object. Also concatenating/adding the value returned from the accessed function to the generatedPassword string variable
            generatedPassword += randomFunctions[funcName]();
          
        });
    }
    //4. Add Generated Password to the final Password variable and return it out of the function

    //Removing extra characters if necessary (the above loop will create a password that may NOT match the length selected if that length is NOT multiple of the number of options/checkboxes selected)

    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);

    return finalPassword;

}

//NOTe usign the starting values 

//event listenre

generateEl.addEventListener(`click`, () => {
    //Checking if the following options/checkboxes are selected and the true/false to the respective variables
    const hasLower = loweCaseEl.checked;
    const hasUpper = upperCaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    const length = parseInt(lengthEl.value);

    //Accessing value for the number input and changing the value from a string to a number
    //Note the value returned from a number input is a string value


    console.log(hasLower, hasUpper, hasNumber, hasSymbol);

    //The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string (aka password) which is set as the innerText value for result 

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy Password
clipboardEl.addEventListener(`click`, () => {
    const textarea = document.createElement(`textarea`);
    // Accessing the text/string value (aka generated password) and set it to 'password' variable
    const password = resultEl.innerText;
    const body = document.querySelector(`body`);

    //If the user clicks the clipboard button while no password is displayed then alert will be displayed and function will end and nothing will be copied to the clipboard

    if(password === ``){
        alert(`Please generate a password first`)
    }

    //Referencing the 'navigator' object to copy the selected value to the clipboard on the device the webpage is viewed on

    navigator.clipboard.writeText(password);

    //A different way for copying the generated Password
    // textarea.value = password;
    // body.append(textarea);
    // textarea.select();
    // document.execCommand(`copy`);
    // textarea.remove();

    // alert(`Password has been copied to the clipboard`)
});