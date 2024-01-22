const cards = document.querySelectorAll('.abc')
counter = 0;
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            counter++; 
            odd = entry.isIntersecting && counter%2 === 0;
            even = entry.isIntersecting && counter%2 === 1;
            if(odd){
                entry.target.classList.add("show")
                observer.unobserve(entry.target)
            }else if(even){
                entry.target.classList.add("show2")
                observer.unobserve(entry.target)
            }

        } )
    },
    {
        threshold: 1,
    }
)

cards.forEach(card => {
    observer.observe(card)
})

var counter = -1;
var positionArray = [0, 0];

function storePos(event, element) {
    counter++; 
    let index = counter%2;
    positionArray[index] = event.clientX;; 
    if (counter % 2 == 1){
        diff = positionArray[index]-positionArray[(index+1)%2]; 
                if (diff > 0) { //coming from left
            element.className = "hover-underline-animation-left";
        } else { //coming from right
            element.className = "hover-underline-animation-right";
        }
    }
}






function removePX(string){
    return Number(string.slice(0, string.length-2));
  }
  function mp(x, y){
    return .5*(x+y);
  }
  
  atFront = atFront2 = 1;
  atFront3 = -1; 
  const velocity = 1;
  var box1;
  var box2;
  var box3;
  var WIDTH1;
  var BIGW;
  bug = true;
  i = 0;
  timeoutID = 0;
  
  function setup(){
    i = 0;
    box1 = document.getElementById("firstBox");
    box2 = document.getElementById("secondBox");
    box3 = document.getElementById("thirdBox");
    WIDTH1 = box1.getBoundingClientRect().right-box1.getBoundingClientRect().left;
    daddy = document.getElementById("earth");
    leftBound = daddy.getBoundingClientRect().left;
    rightBound = daddy.getBoundingClientRect().right;
    BIGW = Math.floor(rightBound - leftBound);
    console.log(BIGW);
    if(bug){
      box1.style.left = `${BIGW/2 - WIDTH1/2}px`;
      atFront = 1;
      box2.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
      atFront2 = -1;
      box3.style.left = `${BIGW/6-WIDTH1/2}px`; 
      atFront3 = -1; 
      box1.style.zIndex = 2;
      box2.style.zIndex = 1;
      box3.style.zIndex = 1;   
    }
    bug = false;
  
  
    startRevolvingDoor();
  }
  
  function stopRevolvingDoor(){
    i = -1;
  }
  
  function pauseRevolvingDoor(element){
    i = 9999999;
    startRevolvingDoor();
    if(element.id == "firstBox"){
      box1.style.left = `${BIGW/2 - WIDTH1/2}px`;
      box2.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
      box3.style.left = `${BIGW/6-WIDTH1/2}px`; 
      atFront = 1;
      box1.style.zIndex = 2;
      atFront2 = atFront3 = -1;
      box2.style.zIndex = box3.style.zIndex = 1;  
    } else if(element.id == "secondBox"){  
      box2.style.left = `${BIGW/2 - WIDTH1/2}px`; 
      box3.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
      box1.style.left = `${BIGW/6-WIDTH1/2}px`; 
      atFront2 = 1;
      box2.style.zIndex = 2;
      atFront3 = atFront = -1;
      box1.style.zIndex = box3.style.zIndex = 1;
      
    } else if (element.id == "thirdBox"){
      box3.style.left = `${BIGW/2 - WIDTH1/2}px`;
      box2.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
      box1.style.left = `${BIGW/6-WIDTH1/2}px`; 
      atFront3 = 1;
      box3.style.zIndex = 2;
      atFront32 = atFront = -1;
      box1.style.zIndex = box2.style.zIndex = 1; 
    }
    i = 10000000;
    setTimeout(() => { i = 1; startRevolvingDoor(); }, 5000);
  }
  
  function startRevolvingDoor() {
    timeoutID++; 
    function myLoop() {         //  create a loop function
      timeoutID = setTimeout(function() {
  
        i++;
  
        rect = box1.getBoundingClientRect();
        srect = box2.getBoundingClientRect();      
        trect = box3.getBoundingClientRect();
  
        //working bounce
        onCooldown = false;
        if ((rect.left < leftBound && !onCooldown)) { onCooldown = true; atFront = -atFront; box1.style.zIndex = 2; }
        if ((srect.left < leftBound && !onCooldown)) { onCooldown = true; atFront2 = -atFront2; box2.style.zIndex = 2;}
        if ((trect.left < leftBound && !onCooldown)) { onCooldown = true; atFront3 = -atFront3; box3.style.zIndex = 2;}
        if ((rect.right > rightBound && !onCooldown)) { onCooldown = true; atFront = -atFront; box1.style.zIndex = 1; }
        if ((srect.right > rightBound && !onCooldown)) { onCooldown = true; atFront2 = -atFront2; box2.style.zIndex = 1;}
        if ((trect.right > rightBound && !onCooldown)) { onCooldown = true; atFront3 = -atFront3; box3.style.zIndex = 1;}
  
        //calculate change in position
        dx1 = velocity * atFront; //small change 
        dx2 = velocity * atFront2;
        dx3 = velocity * atFront3;
        
        function scaleCalc(rect, af) {
          divMP = .5*(rect.right+rect.left);
          divWidth = rect.right-rect.left;
          jCP =(rect.left-leftBound)/(2*(rightBound-leftBound-divWidth))+.5; 
          theCore = .5*(leftBound+rightBound);
          const n = 4;                    
          if( af > 0 && divMP < theCore) {jCP = (rect.left-leftBound)/(n*(rightBound-leftBound-divWidth))+.875;}  // .875 < jCP < 1    || mp(.75, .75 + 1/n)
          else if (af > 0 && divMP > theCore) { jCP = 1.125-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth));} // 1/n + mp(.75, .75 + 1/n)    - jCP
          else if (af < 0 && divMP > theCore) { jCP =(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth))+.625 ; } // .75 + mp(0, .25)
          else if (af < 0 && divMP < theCore) { jCP = .875-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth)) ; } // mp
          return jCP;
        }
  
        function update(box, dx, rect, atFront){
          base = removePX(box.style.left);
          box.style.setProperty('--scale', scaleCalc(rect, atFront));        
          box.style.left = Math.floor(base + dx) + "px";
        }
        update(box1, dx1, rect, atFront);
        update(box2, dx2, srect, atFront2);
        update(box3, dx3, trect, atFront3);
   
        if (i < 10000000 && i > 0) {
          myLoop();  
        }                     
      }, 1)
    }
    if(timeoutID > 1) {
      clearTimeout(timeoutID);
    }
    //2 hours 42 minutes- average client won't stay for that long 
    myLoop();  
  }
  
  function hoverd(element) {
    a = document.getElementById("clickme1");
    b = document.getElementById("clickme2");
    c = document.getElementById("clickme3");
  
    if(element.id == "firstBox"){a.id = "clickme1h";}
    else if(element.id == "secondBox"){b.id = "clickme2h";}
    else if (element.id == "thirdBox"){c.id = "clickme3h";}
  }
  function dehoverd(element) {
    if(element.id == "firstBox"){a.id = "clickme1";}
    else if(element.id == "secondBox"){b.id = "clickme2";}
    else if (element.id == "thirdBox"){c.id = "clickme3";}
  }