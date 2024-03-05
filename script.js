generateGrid(16, 16);

function hoverEventHandler(inputElement, chosenEvent){
  switch (chosenEvent) {
    case 1:
      rainbowMode(inputElement);
      break;
    case 2:
      changeBgToRnd(inputElement);
      break;
    default:
      break;
  }
}

randomNum = (maxNum = 255) => Math.floor(Math.random() * maxNum);

changeBgToRnd = (inputElement) => inputElement.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

rainbowMode = (inputElement) => inputElement.style.backgroundColor = `hsl(${hslHue()}, 65%, 50%)`;

function hslHue() {
  hslHuePosition = typeof(hslHuePosition) === 'undefined' ? 0 : hslHuePosition;
  hslHuePosition = (hslHuePosition < 350) ? hslHuePosition +20 : 0;
  return hslHuePosition;
}

function setGridEvent(selectedEvent = 0){
  let gridSquares = document.querySelectorAll(".column > .row");
  gridSquares.forEach(element => {
    element.addEventListener('mouseenter', () =>  hoverEventHandler(element, selectedEvent))
  });
}


//This will probably need a rewrite using for each. First create the columns using a simple for loop, then create the columns using for each.
//Maybe separate some functionality, like creating the elements?

function generateGrid(xAxisAmount, yAxisAmount) {
  const rootDiv = document.getElementById('etch-a-sketch');
  rootDiv.style.display = 'flex';
  rootDiv.replaceChildren();
  
  for (i = 0; i < xAxisAmount; i++) {
    let div = document.createElement("div")
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.classList.add('column');
    rootDiv.appendChild(div);
  }

  let xAxisDivs = rootDiv.children;
  for (j = 0; j < xAxisAmount; j++) {
    let selectedDiv = j;
    for (k = 0; k < yAxisAmount; k++) {
      let div = document.createElement("div");
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.border = '1px solid black';
      div.classList.add('row');
      xAxisDivs[selectedDiv].appendChild(div);
    }
  }
  setGridEvent(1);
}