var counter = -1;
var positionArray = [0, 0];

function storePos(event, element) {
    counter++; 
    let xPos = event.clientX;
    let index = counter%2;
    positionArray[index] = xPos; 
    if (counter % 2 == 1){
        var x = element;
        diff = positionArray[index]-positionArray[(index+1)%2]; 
        if (diff > 0) { //coming from left
            x.className = "hover-underline-animation-left";
        } else { //coming from right
            x.className = "hover-underline-animation-right";
        }
    }
}