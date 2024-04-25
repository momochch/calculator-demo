// 目前的問題是按下第一個數字鍵不會傳入 firstValue 裡面，要按下第二個數字鍵才會傳入第一個案的數字，以及按下'等於'時，沒有回傳結果

// 後續還要再解決按完 C 雖然歸零，但是按下第一個數字 console 出來仍是 Second value

// ---節點---
const displayValue = document.querySelector(".display-value"); // 顯示的地方
const number = document.querySelectorAll(".number"); //00, 0-9
const percent = document.querySelector(".percent"); //%
const deleteOne = document.querySelector(".deleteOne"); // <--
const clearAll = document.querySelector(".clearAll"); //C
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const operation = document.querySelectorAll(".add, .minus, .multiply, .divide");

// 是否已經輸入第一個數字
let firstInput = true;
let firstValue = ""; // 儲存上一個值
let secoedValue = ""; // 儲存新值
let currentOperation = ""; // 儲存運算符號

// --- 監聽 ---
// 監聽數字按鈕 --- number 和 operation 要 forEach---
// TODO: 監聽數字按鈕和運算符的上層容器，再根據按鈕的 class 或 id 判斷哪一個按鈕被點擊
number.forEach((button) => {
  button.addEventListener("click", function () {
    // TODO: displayValue 是顯示的數值，應取得當前 button 的數值
    const number = button.textContent;
    console.log(`number: ${number}`);

    let clickedNumber = displayValue.textContent;
    // 檢查當前操作是否為空

    if (currentOperation === "") {
      // 如果是空，將顯示的值賦給previousValue
      firstValue = clickedNumber;
      console.log("First value: " + firstValue);
    } else {
      // 如果不是空，將顯示的值賦給currentValue
      secoedValue = clickedNumber;
      console.log("Second value: " + secoedValue);
    }

    // TODO: 宣告 function calculate(firstValue, secoedValue) 時，要求傳入參數，不可以留空
    calculate();
    showValue();
  });
});
operation.forEach((button) => {
  button.addEventListener("click", function () {
    currentOperation = button.textContent;
    firstInput = true;
    console.log(currentOperation);
    calculate();
  });
});

// 監聽 %
percent.addEventListener("click", clickedPercent);

// 監聽  <--
deleteOne.addEventListener("click", deleteOneNumber);

// 監聽 C
clearAll.addEventListener("click", clearAllNumber);

// 監聽 .
dot.addEventListener("click", showValue);

//監聽 =
equal.addEventListener("click", function () {
  calculate();
  console.log(equal.textContent);
});

// ---function---
// 按 C 清除所有數字，並顯示 0
function clearAllNumber() {
  // const clickedClearAll = (displayValue.textContent = 0);
  displayValue.textContent = 0;
  firstInput = true;
  firstValue = "";
  secoedValue = "";
}

// 按 <-- 刪除最後一個輸入的數字
function deleteOneNumber() {
  let currentNumber = displayValue.textContent;
  currentNumber = currentNumber.slice(0, -1);
  displayValue.textContent = currentNumber;

  if (currentNumber === "") {
    displayValue.textContent = "0";
    firstInput = true;
  } // 如果刪到空了，顯示 0，並回到 firstInput = true 狀態
}

// 按 % 將該數 /100 後顯示
function clickedPercent() {
  let currentNumber = displayValue.textContent;
  currentNumber = currentNumber / 100;
  displayValue.textContent = currentNumber;
}

// 執行秀在 display 框框裡
// 只顯示數字
function showValue() {
  // TODO: 這裡預期取得按鈕上的值，但沒有傳入 event 這個變數，目前可以正確運作是 JS 猜測你的意圖，但
  let clickedNumber = event.target.textContent; // 取得按鈕上的值
  console.log(`clickedNumber: ${clickedNumber}`);

  // TODO: firstInput 為 true 的時候，等價於 firstInput === true，不需要再判斷它是否為 true
  if (firstInput === true) {
    displayValue.textContent = "";
    firstInput = false; // 清空之後就是 false，表示已經輸入第一個值
  }
  displayValue.textContent += clickedNumber;
}

// 運算
// 先進行計算，不要跑去 displayValue 裡面
// TODO: firstValue, secoedValue 預設為字串，計算前應透過 Number(xxx) 轉換成數字
// TODO: 目前呼叫 calculate 的地方都沒有用變數來儲存返回值 result
// TODO: 如果這裡是希望計算最上方宣告的 firstValue, secoedValue，那函式就不需要宣告這兩個參數
function calculate(firstValue, secoedValue) {
  // TODO: 使用字串來拼接，會變成 3 + 5 --> 35
  let result = "";

  switch (currentOperation) {
    case "+":
      result = firstValue + secoedValue;
      break;
    case "-":
      result = firstValue - secoedValue;
      break;
    case "×":
      result = firstValue * secoedValue;
      break;
    case "÷":
      result = firstValue / secoedValue;
      break;
    default:
      result = firstValue;
  }
  return result;
  // displayValue.textContent = result;
  // console.log("result" + result);
}
