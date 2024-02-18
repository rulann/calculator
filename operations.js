var initClick = true;
var longPressTimer;
var isLongPress = false;
let isInv = false;
let answer = 0;
let isRad = true;


function display(a){
    let val = document.getElementById("box");
    String(val);

    if(initClick){
        val.value = a;
        initClick = false;
    }
    else{
        val.value += a
    }
    
}

function startLongPress() {
    longPressTimer = setTimeout(function() {
        isLongPress = true;
        clearEntry();
    }, 500);
}

function endLongPress() {
    clearTimeout(longPressTimer);
    if (!isLongPress) {
        del()
    }
    isLongPress = false;
}

function clearEntry() {
    let val = document.getElementById("box")
    val.value = "0"
    initClick = true
}

function del(){
    let val = document.getElementById("box")
    val.value = val.value.slice(0, -1); 
    initClick = false
}

function ans() {
    let val = document.getElementById("box");
    val.value = answer.toString();
}

function updateMode() {
    isRad = !isRad;
    
    var radBtn = document.getElementById("radBtn");
    var degBtn = document.getElementById("degBtn");

    if (isRad){
        degBtn.setAttribute("disabled", "true");
        radBtn.removeAttribute("disabled")
    }
    else{
        radBtn.setAttribute("disabled", "true");
        degBtn.removeAttribute('disabled');
    }
    
}


function eql() {
    let val = document.getElementById("box");
    let equation = val.value;
    let result;
      
    while (equation.includes('+') || equation.includes('-') || equation.includes('×') || equation.includes('÷') || equation.includes('%') || equation.includes('√') || equation.includes('!') || equation.includes('log(') || equation.includes('ln(') || equation.includes('sin(') || equation.includes('cos(') || equation.includes('tan(') || equation.includes('e') || equation.includes('π')|| equation.includes('Ans') || equation.includes('^') || equation.includes('E') ) {
        
       if (equation.includes('+')) {
            let parts = equation.split('+');
            result = parseFloat(parts[0]) + parseFloat(parts[1]);
            equation = result + equation.substr(equation.indexOf('+') + 2);
        } 
        else if (equation.includes('-')){
            let parts = equation.split('-');
            result = parseFloat(parts[0]) - parseFloat(parts[1]);
            equation = result + equation.substr(equation.indexOf('-') + 2);
        }
        else if(equation.includes('×')){
            let parts = equation.split('×');
            result = parseFloat(parts[0]) * parseFloat(parts[1]);
            equation = result + equation.substr(equation.indexOf('×') + 2);
        }
        else if (equation.includes('÷')) {
            let parts = equation.split('÷');
            result = division(parseFloat(parts[0]), parseFloat(parts[1]));
            equation = result + equation.substr(equation.indexOf('÷') + 2);
        }
        else if (equation.includes('%')) {
            let parts = equation.split('%');
            result = percentage(parseFloat(parts[0]));
            equation = result + equation.substr(equation.indexOf('%') + 1);
        }
        else if (equation.includes('√')) {
            let parts = equation.split('√');
            result = Math.sqrt(parseFloat(parts[1]));
            equation = result + equation.substr(equation.indexOf('√') + 2);
        }
        else if (equation.includes('!')) {
            let parts = equation.split('!');
            result = fact(parseFloat(parts[0]));
            equation = result + equation.substr(equation.indexOf('!') + 2);
        }
        else if (equation.includes('log(')) {
            let parts = equation.split('log(');
            result = Math.log10(parseFloat(parts[1]));
            equation = result + equation.substr(equation.indexOf('log(') + 2);
        }
        else if (equation.includes('ln(')) {
            let parts = equation.split('ln(');
            result = Math.log(parseFloat(parts[1]));
            equation = result + equation.substr(equation.indexOf('ln(') + 2);    
        }
        else if (equation.includes('sin(')) {
            let parts = equation.split('sin(');
            result = isRad? Math.sin(parseFloat(parts[1])): Math.sin((parseFloat(parts[1]) * Math.PI) / 180);
            equation = result + equation.substr(equation.indexOf('sin(') + 2);
        }
        else if (equation.includes('cos(')) {
            let parts = equation.split('cos(');
            result = isRad? Math.cos(parseFloat(parts[1])): Math.cos((parseFloat(parts[1]) * Math.PI) / 180);
            equation = result + equation.substr(equation.indexOf('cos(') + 2);
        }
        else if (equation.includes('tan(')) {
            let parts = equation.split('tan(');
            result = isRad? Math.tan(parseFloat(parts[1])): Math.tan((parseFloat(parts[1]) * Math.PI) / 180);
            equation = result + equation.substr(equation.indexOf('tan(') + 2);
        }
        else if (equation.includes('e')) {
            result = Math.E;
            equation = result + equation.substr(equation.indexOf('e') + 1);
        }
        else if (equation.includes('π')) {
            result = Math.PI;
            equation = result + equation.substr(equation.indexOf('π') + 1);
        }
        
        else if(equation.includes('^')){
            let parts = equation.split('^');
            result = Math.pow(parseFloat(parts[0]), parseFloat(parts[1]));
            equation = result + equation.substr(equation.indexOf('^') + 2);
        }

        else if(equation.includes('E')){
            let parts = equation.split('E');
            result = parseFloat(parts[0]) * (Math.pow(10, parseFloat(parts[1])));
            equation = result + equation.substr(equation.indexOf('E') + 2);
        }
          
        answer = result;
    }

    val.value = result.toString();
    initClick = true;
    
}

function inv(){
    isInv = !isInv; 
    updateButton();
}

function updateButton(){
    const sinButton = document.getElementById("sin");
    const cosButton = document.getElementById("cos");
    const tanButton = document.getElementById("tan");
    const lnButton = document.getElementById("ln");
    const logButton = document.getElementById("log");
    const rtButton = document.getElementById("rt");
    const ansButton = document.getElementById("ans");
    const powButton = document.getElementById("pow");

  if (sinButton.innerText === "sin") {
    sinButton.innerHTML = "sin<sup>-1</sup>";
    sinButton.setAttribute("data-state", "inverse");
  } else {
    sinButton.innerText = "sin";
    sinButton.removeAttribute("data-state");
  }

  if (cosButton.innerText === "cos") {
    cosButton.innerHTML = "cos<sup>-1</sup>";
    cosButton.setAttribute("data-state", "inverse");
  } else {
    cosButton.innerText = "cos";
    cosButton.removeAttribute("data-state");
  }

  if (tanButton.innerText === "tan") {
    tanButton.innerHTML = "tan<sup>-1</sup>";
    tanButton.setAttribute("data-state", "inverse");
  } else {
    tanButton.innerText = "tan";
    tanButton.removeAttribute("data-state");
  }

  if (logButton.innerText === "log") {
    logButton.innerHTML = "10<sup>x</sup>";;
    logButton.setAttribute("data-state", "inverse");
  } else {
    logButton.innerText = "log";
    logButton.removeAttribute("data-state");
  }

  if (lnButton.innerText === "ln") {
    lnButton.innerHTML = "e<sup>x</sup>";
    lnButton.setAttribute("data-state", "inverse");
  } else {
    lnButton.innerText = "ln";
    lnButton.removeAttribute("data-state");
  }

  if (rtButton.innerText === "√") {
    rtButton.innerText = "x²";
    rtButton.setAttribute("data-state", "inverse");
  } else {
    rtButton.innerText = "√";
    rtButton.removeAttribute("data-state");
  }

  if (powButton.innerHTML === "<sup>y</sup>√x") {
    powButton.innerHTML = "x<sup>y</sup>";
    powButton.setAttribute("data-state", "inverse");
} else {
    powButton.innerHTML = "<sup>y</sup>√x"; 
    powButton.removeAttribute("data-state");
}

  if (ansButton.innerText === "Ans") {
    ansButton.innerText = "Rnd";
    ansButton.setAttribute("data-state", "inverse");
  } else {
    ansButton.innerText = "Ans";
    ansButton.removeAttribute("data-state");
  }
}

function division(a, b){
    if ( b == 0)
        display("Infinite")
    else 
        return a/b
}

function percentage(a){
    return a/100;
}

function fact(a){
    let m = 1
    for(let i = a; i>0; i--)
        m = a * fact(a-1)
    return m
}