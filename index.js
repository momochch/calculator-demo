//還可以把全部按鈕綁在一起監聽，在分別抓
// 未來可再加算完結果後，按下一鍵重新開始(function restart)

// ---節點---
const displayValue = document.querySelector(".display-value"); //顯示的地方
const calculatorBtn = document.querySelectorAll(".number, .operation, .equal");
const percent = document.querySelector(".percent"); //%
const deleteOne = document.querySelector(".delete-one"); // <--
const clearAll = document.querySelector("#clear-all"); //C

let firstInput = true; //是否已經輸入第一個數字
let firstNumber = ""; // 儲存第一個值
let secondNumber = ""; // 儲存第二個值
let currentOperation = "";
// let result = "";

//---監聽---
calculatorBtn.forEach((button) => {
  button.addEventListener("click", function clickedNumber(event) {
    let number = button.textContent;

    if (event.target.classList.contains("number")) {
      if (currentOperation === "") {
        firstNumber += number;
        // console.log(`number1: ${firstNumber}`);
      } else {
        secondNumber += number;
        // console.log(`number2: ${secondNumber}`);
      }
      showValue(button);
    }
    if (event.target.classList.contains("operation")) {
      currentOperation = event.target.textContent;
      // console.log("currentOperation:" + currentOperation);
    }
    if (event.target.classList.contains("equal")) {
      calculate(firstNumber, secondNumber);
      showResult(result);
    }
  });
});

percent.addEventListener("click", clickedPercent); //監聽 %
deleteOne.addEventListener("click", deleteOneNumber); //監聽  <--
clearAll.addEventListener("click", clearAllNumber); //監聽 C
equal.addEventListener("click", calculate); //監聽 =

//---function---

//按C清除所有數字，並顯示0
function clearAllNumber() {
  const clickedClearAll = (displayValue.textContent = 0);
  currentOperation = "";
  firstNumber = "";
  secondNumber = "";
}

//按<-- 刪除最後一個輸入的數字
function deleteOneNumber() {
  let currentNumber = displayValue.textContent;
  currentNumber = currentNumber.slice(0, -1);

  //   如果還沒按符號，減完的數值傳入第一數，反之傳入第二數
  if (currentOperation === "") {
    firstNumber = currentNumber;
    // console.log("currentNumber:" + currentNumber);
  } else {
    displayValue.textContent = "";
    secondNumber = currentNumber;
    // console.log("currentNumber2:" + currentNumber);
  }
  displayValue.textContent = currentNumber;

  if (currentNumber === "") {
    displayValue.textContent = "0";
    firstNumber = "";
    secondNumber = "";
  }
}

//按% 將該數/100後顯示
function clickedPercent() {
  let currentNumber = displayValue.textContent;
  currentNumber = currentNumber / 100;

  //   如果還沒按符號，除完100的數值傳入第一數，反之傳入第二數
  if (currentOperation === "") {
    firstNumber = currentNumber;
    // console.log("currentNumber:" + currentNumber);
  } else {
    displayValue.textContent = "";
    secondNumber = currentNumber;
    // console.log("currentNumber2:" + currentNumber);
  }
  displayValue.textContent = currentNumber;
}

//執行秀在display框框裡
//只顯示數字
function showValue(button) {
  let clickedNumber = button.textContent; //取得按鈕上的值

  if (firstInput) {
    displayValue.textContent = "";
    firstInput = false; //清空之後就是false，表示已經輸入第一個值
  }
  if (currentOperation === "") {
    displayValue.textContent = firstNumber;
  } else {
    displayValue.textContent = "";
    displayValue.textContent = secondNumber;
  }

  //顯示結果
}
function showResult(result) {
  displayValue.textContent = "";
  displayValue.textContent += result;
}

//運算
// parseFloat & parseInt 轉成數值運算，parseFloat可算小數點
function calculate(firstNumber, secondNumber) {
  switch (currentOperation) {
    case "+":
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
      break;
    case "-":
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
      break;
    case "×":
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
      break;
    case "÷":
      result = parseFloat(firstNumber) / parseFloat(secondNumber);
      break;
  }
  return result;
}
