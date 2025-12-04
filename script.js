let div = document.getElementById("calc");
let outerbox = document.createElement("div");
outerbox.id = "outerbox";
let topinnerbox = document.createElement("div");
topinnerbox.id = "topinnerbox";
let bottominnerbox = document.createElement("div");
bottominnerbox.id = "bottominnerbox";
let outputbox = document.createElement("input");
outputbox.id = "outputbox";
outputbox.className = "form-control mb-3 text-end fs-4";
topinnerbox.appendChild(outputbox);
let t1 = document.createElement("button");
t1.textContent = "1";
let t2 = document.createElement("button");
t2.textContent = "2";
let t3 = document.createElement("button");
t3.textContent = "3";
let t4 = document.createElement("button");
t4.textContent = "+";
let t5 = document.createElement("button");
t5.textContent = "4";
let t6 = document.createElement("button");
t6.textContent = "5";
let t7 = document.createElement("button");
t7.textContent = "6";
let t8 = document.createElement("button");
t8.textContent = "-";
let t9 = document.createElement("button");
t9.textContent = "7";
let t10 = document.createElement("button");
t10.textContent = "8";
let t11 = document.createElement("button");
t11.textContent = "9";
let t12 = document.createElement("button");
t12.textContent = "*";
let t13 = document.createElement("button");
t13.textContent = "0";
let t14 = document.createElement("button");
t14.textContent = "=";
let t15 = document.createElement("button");
t15.textContent = "%";
let t16 = document.createElement("button");
t16.textContent = "/";
let t17 = document.createElement("button");
t17.textContent = "C";
let t18 = document.createElement("button");//Storing in localstorage
t18.textContent = "M+";
let t19 = document.createElement("button");// removinf from localstorage
t19.textContent = "MC";

bottominnerbox.appendChild(t1);
bottominnerbox.appendChild(t2);
bottominnerbox.appendChild(t3);
bottominnerbox.appendChild(t4);
bottominnerbox.appendChild(t5);
bottominnerbox.appendChild(t6);
bottominnerbox.appendChild(t7);
bottominnerbox.appendChild(t8);
bottominnerbox.appendChild(t9);
bottominnerbox.appendChild(t10);
bottominnerbox.appendChild(t11);
bottominnerbox.appendChild(t12);
bottominnerbox.appendChild(t13);
bottominnerbox.appendChild(t14);
bottominnerbox.appendChild(t15);
bottominnerbox.appendChild(t16);
bottominnerbox.appendChild(t17);
bottominnerbox.appendChild(t18);
bottominnerbox.appendChild(t19);
outerbox.appendChild(topinnerbox);
outerbox.appendChild(bottominnerbox);
div.appendChild(outerbox);
[t1, t2, t3, t5, t6, t7, t9, t10, t11, t13].forEach(item => { item.className = "btn btn-secondary"; item.style.cursor = "not-allowed"; })
t4.className = "btn btn-info";
t8.className = "btn btn-info";
t12.className = "btn btn-info";
t14.className = "btn btn-info";
t15.className = "btn btn-info";
t16.className = "btn btn-info";
t17.className = "btn btn-danger";
t18.className = "btn btn-primary";
t19.className = "btn btn-danger";

let expression = "";
let currentvalue = "";
outputbox.addEventListener("keyup", (e) => {
    currentvalue = e.target.value;
    if (!(/^[0-9]+$/.test(currentvalue))) {
        alert("typed non number in the box");
        outputbox.value = "";
    }
})
t4.addEventListener("click", () => {
    expression +=currentvalue+"+";
    console.log(expression);
    currentvalue = "";
    outputbox.value = "";

});
t8.addEventListener("click", () => {
    expression += currentvalue+"-";
    currentvalue = "";
    outputbox.value = "";
});
t12.addEventListener("click", () => {
    expression +=currentvalue+ "*";
    console.log("btn"+expression)
    currentvalue = "";
    outputbox.value = "";
});
t16.addEventListener("click", () => {
    expression +=currentvalue+  "/";
    currentvalue = "";
    outputbox.value = "";
});

t17.addEventListener("click", () => {
    outputbox.value = 0;
})


t14.addEventListener("click", () => {
    expression+=currentvalue;
    infixcalc();
    expression="";
    currentvalue="";
});
function precedence(exp) {
    if (exp == "+" || exp == "-") {
        return 1;
    }
    if (exp == "*" || exp == "/" || exp == "%") {
        return 2;
    }
}
function infixcalc() {
    console.log(expression)
    let ops = [];
    let nums = [];
    let start = 0;
    for ( let i = 0; i < expression.length; i++) {
        if (expression.charAt(i) == "+" || expression.charAt(i) == "-" || expression.charAt(i) == "*" || expression.charAt(i) == "/" || expression.charAt(i) == "%") {
            let value =expression.substring(start, i);
            console.log(value);
            
            nums.push(parseInt(value));
            console.log(nums);
            start = i + 1;
             while(ops.length && precedence(ops[ops.length - 1]) >= precedence(expression[i])) {
                let operator = ops.pop();
                let b = parseInt(nums.pop());
                let a = parseInt(nums.pop());
                let result=equals(a, b, operator);
                nums.push(result);
                console.log( "else "+nums)
            }
            ops.push(expression.charAt(i));
            console.log(ops);
            }
            
     }
  nums.push(parseInt(expression.substring(start)));
 while(ops.length){
    operator=ops.pop();
    b=nums.pop();
    a=nums.pop();   
    let result=equals(a,b,operator);
    nums.push(result);
  }
   c=nums.pop();
   console.log(c);
 outputbox.value=c;
}
let c = 0;

function equals(a, b, operator) {
    if (operator == "+") {
        c = a + b;
        console.log(c);
        
        return c;

    }
    else if (operator == "-") {
        if (a < b) {
            if (confirm("The value might be negative: yes or no")) {
                c = a - b;
                console.log(c);
                
           return c;

            }
        }
        else {
            c = a - b;
            console.log(c);
            
            return c;
        }


    }
    else if (operator == "*") {
        c = a * b;
        console.log(c);
        
        return c;

    }
    else if (operator == "/") {
        if (a < b) {
            if (confirm("Numerator is less than denominator: are you sure to continue")) {
                c = a / b;
                console.log(c);
                
          return c;
            }
        }
        else {
            c = a / b;
            console.log(c);
            
            return c;
        }
    }
    else {
        c = a % b;
        console.log(c);
        
        return c;
    }
}
t15.addEventListener("click", () => {
    expression += currentvalue + "%";
    currentvalue = "";
    outputbox.value = "";
});
t18.addEventListener("click", () => {
    localStorage.setItem(outerbox, JSON.stringify(c));
})
t19.addEventListener("click", () => {
    c = 0;
    localStorage.setItem(outerbox, JSON.stringify(c));
})