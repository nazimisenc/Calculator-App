const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");
const keydown = document.querySelector("body");

let displayValue ="0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay()
{
    display.value = displayValue;
}

keys.addEventListener("click",function(e)  //Click events
{
    const element = e.target;

    if (element.className === "calculator-keys")
    {
        return;
    }

    if (element.classList.contains("operator"))
    {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("decimal"))
    {
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("clear"))
    {
        clear();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
    
}
);

keydown.addEventListener("keydown",function(e) // Keyboard events : Everyone also can use calculator with keyboard.
{
    if (e.key in ["0","1","2","3","4","5","6","7","8","9"])
    {
        inputNumber(e.key);
        updateDisplay();
        return;
    }
    if (e.key === "+")
    {
        handleOperator("+");
        updateDisplay();
        return;
    }
    if (e.key === "-")
    {
        handleOperator("-");
        updateDisplay();
        return;
    }
    if (e.key === "*")
    {
        handleOperator("*");
        updateDisplay();
        return;
    }
    if (e.key === "/")
    {
        handleOperator("/");
        updateDisplay();
        return;
    }
    if (e.keyCode === 13)
    {
        handleOperator("=");
        updateDisplay();
        return;
    }
    if (e.keyCode === 190)
    {
        inputDecimal(".");
        updateDisplay();
        return;
    }
    if (e.keyCode === 8)
    {
        clear();
        updateDisplay();
        return;
    }
}
);

function handleOperator(nextOperator)
{
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue)
    {
        operator = nextOperator;
        return;
    }

    if (firstValue === null)
    {
        firstValue = value;
    }
    else if(operator)
    {
        const result = calculate(firstValue,value,operator);
        
        displayValue = String(result);
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first,second,operator)
{
    if (operator ==="+")
    {
        return first+second;
    }
    else if(operator ==="-")
    {
        return first-second;
    }
    else if(operator ==="*")
    {
        return first*second;
    }
    else if (operator ==="/")
    {
        return first/second;
    }
    return second;
}

function inputNumber(num)
{
    if (waitingForSecondValue)
    {
        displayValue = num;
        waitingForSecondValue = false;
    }
    else
    {
        displayValue = displayValue === "0"? num: displayValue + num;
    }

}

function inputDecimal()
{
    if (!displayValue.includes("."))
    {
        displayValue += ".";
    }
}

function clear() 
{
    displayValue ="0";
}
