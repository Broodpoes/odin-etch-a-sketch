generateGrid();

function hoverEventHandler(inputElement, chosenEvent){
  switch (chosenEvent) {
    case 1:
      rainbowMode(inputElement);
      break;
    case 2:
      changeBgToRnd(inputElement);
      break;
    case 3:
      darkenMode(inputElement);
      break;
    default:
      break;
  }
}

randomNum = (maxNum = 255) => Math.floor(Math.random() * maxNum);

changeBgToRnd = (inputElement) => inputElement.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

rainbowMode = (inputElement) => inputElement.style.backgroundColor = `hsl(${hslHue()}, 65%, 50%)`;

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

/*
TODO: Adjust setGridEvents to add an event listener that calls 
for the selected event in each div. 
So it doesn't need to update every event listener to a new event.

Add/change a function that returns the current selected event?
*/

function setGridEvent(selectedEvent){
  eventChosen = typeof(eventChosen) === 'undefined' ? 1 : eventChosen;
  if (selectedEvent !== undefined){eventChosen = selectedEvent}
  console.log("Event chosen: " + eventChosen);
  let gridSquares = document.querySelectorAll(".column > .row");
  gridSquares.forEach(element => {
    element.addEventListener('mouseenter', () =>  hoverEventHandler(element, eventChosen))
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
  setGridEvent();
}