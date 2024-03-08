generateGrid();
setGridEvent(1);
document.getElementById('color-selector').addEventListener('input', setColorPickerBg);

function setGridEvent(input){
  chosenEvent = typeof(input) === 'undefined' ? chosenEvent : input;
  return chosenEvent;
}

function hoverEventHandler(element){
  switch (setGridEvent()) {
    case 1:
      rainbowMode(element);
      break;
    case 2:
      changeBgToRnd(element);
      break;
    case 3:
      darkenMode(element);
      break;
    case 4:
      colorMode(element);
      break;
    default:
      break;
  }
}


function getPickedCol(){
  colorPicker = document.getElementById('color-selector');
  return colorPicker.value;
}

function setColorPickerBg(){
  colorPickerBg = document.getElementById('colSelect')
  colorPickerBg.style.backgroundColor = getPickedCol();
}

randomNum = (maxNum = 255) => Math.floor(Math.random() * maxNum);

changeBgToRnd = (inputElement) => inputElement.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

rainbowMode = (inputElement) => inputElement.style.backgroundColor = `hsl(${hslHue()}, 65%, 50%)`;

colorMode = (inputElement) => inputElement.style.backgroundColor = `${getPickedCol()}`;

darkenMode = (element) => {
  const elementStyle = window.getComputedStyle(element);
  const currentBgCol = elementStyle.backgroundColor;
  let rgbValue = currentBgCol.match(/\d+/g);
  rgbValue.forEach((element, index) => {
    rgbValue[index] = (element > 20) ? element -20 : 0;
  });
  element.style.backgroundColor = `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`
}

function hslHue() {
  hslHuePosition = typeof(hslHuePosition) === 'undefined' ? 0 : hslHuePosition;
  hslHuePosition = (hslHuePosition < 350) ? hslHuePosition +20 : 0;
  return hslHuePosition;
}

function setGridEventHandler(){
  let gridSquares = document.querySelectorAll(".column > .row");
  gridSquares.forEach(element => {
    element.addEventListener('mouseenter', () =>  hoverEventHandler(element))
  });
}

//This will probably need a rewrite using for each. First create the columns using a simple for loop, then create the columns using for each.
//Maybe separate some functionality, like creating the elements?

function getGridSize(){
  getXAxisValue = () => document.getElementById("x-axis").value;
  getYAxisValue = () => document.getElementById("y-axis").value;
  return {xAxis:getXAxisValue(), yAxis:getYAxisValue()};
}

function generateGrid(){
  let gridSize = getGridSize();
  console.log(gridSize);
  const rootDiv = document.getElementById('etch-a-sketch');
  rootDiv.style.display = 'flex';
  rootDiv.replaceChildren();
  
  for (i = 0; i < gridSize.xAxis; i++) {
    let div = document.createElement("div")
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.classList.add('column');
    rootDiv.appendChild(div);
  }

  let xAxisDivs = rootDiv.children;
  for (j = 0; j < gridSize.xAxis; j++) {
    let selectedDiv = j;
    for (k = 0; k < gridSize.yAxis; k++) {
      let div = document.createElement("div");
      div.classList.add('row');
      xAxisDivs[selectedDiv].appendChild(div);
    }
  }
  setGridEventHandler();
}