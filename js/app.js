buttonNumbers = document.querySelectorAll('.buttonNumbers')
calcScreen = document.querySelector('#calcScreen')
operationButtons = document.querySelectorAll('.operationButtons')
clearButton = document.querySelector('#clearButton')
deleteButton = document.querySelector('#deleteButton')
dotButton = document.querySelector('#dotButton')
equalButton = document.querySelector('#equalButton')
operations = ["+","-","x","/"]
let operationsChecker = false

function updateScreen(screenValue = ""){
  calcScreen.innerText = screenValue
}

function getScreenValue(){
  let screenValue = calcScreen.innerText
  return screenValue
}

function setScreenValue(screenValue,element){
  screenValue += element.value
  return screenValue
}

function deleteLast(screenValue){
  screenValue = screenValue.slice(0,-1)
  return screenValue
}

function splitScreenValue(screenValue){
  let number1 = 0
  let number2 = 0
  let opIndex = 0
  let operation = 0
  operations.forEach(op => {
    if(screenValue.includes(op)){
      operation = op
      opIndex = screenValue.indexOf(op)
      number1 = parseFloat(screenValue.slice(0,opIndex))
      number2 = parseFloat(screenValue.slice(opIndex+1))
    }
  })
  return {
    number1: number1,
    operation: operation,
    number2:number2
  }
}

function calculate(splitedValue){
  const {number1,operation,number2} = splitedValue
  let result = 0
  switch (operation) {
    case "+":
      result = number1 + number2
      break;
    case "-":
      result = number1 - number2
      break;
    case "x":
      result = number1 * number2
      break;
    case "/":
      result = number1 / number2
      break;
  }

  return result
}

buttonNumbers.forEach(numb => {
  numb.addEventListener('click', () => {
    let screenValue = getScreenValue()
    screenValue = setScreenValue(screenValue,numb)
    updateScreen(screenValue)
  })
})

operationButtons.forEach(operation => {
  operation.addEventListener('click', () => {
    let screenValue = getScreenValue()
    let splitedValue = splitScreenValue(screenValue)
    if(splitedValue.operation != 0){
      let result = calculate(splitedValue)
      updateScreen(result)
      screenValue = getScreenValue()
      screenValue = setScreenValue(screenValue,operation)
      updateScreen(screenValue)
    }
    else{
      screenValue = setScreenValue(screenValue,operation)
      updateScreen(screenValue)
    }
  })
})

clearButton.addEventListener('click', () => {
  updateScreen()
})

deleteButton.addEventListener('click', () => {
  let screenValue = getScreenValue()
  screenValue = deleteLast(screenValue)
  updateScreen(screenValue)
})

dotButton.addEventListener('click', () => {
  let screenValue = getScreenValue()
  if(screenValue.includes(".") != true){
    screenValue = setScreenValue(screenValue,dotButton)
    updateScreen(screenValue)
  }
})

equalButton.addEventListener('click', () => {
  let screenValue = getScreenValue()
  let splitedValue = splitScreenValue(screenValue)
  if(splitedValue.operation != 0){
    let result = calculate(splitedValue)
    updateScreen(result)
  }
})