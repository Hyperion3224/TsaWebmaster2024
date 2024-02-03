
function removePX(string){
  return Number(string.slice(0, string.length-2));
}

function mp(x, y){
  return .5*(x+y);
}

function scaleCalc(boxinfo) {
  rect = boxinfo.rectangle;
  af = boxinfo.atFront;
  divMP = .5*(rect.right+rect.left);
  divWidth = rect.right-rect.left;
  jCP =(rect.left-leftBound)/(2*(rightBound-leftBound-divWidth))+.5; 
  theCore = .5*(leftBound+rightBound);
  const n = 2;  // 0 - .25                  
  if( af > 0 && divMP <= theCore) {jCP = (rect.left-leftBound)/(n*(rightBound-leftBound-divWidth)) + .75;}  // .75 < jCP < 1    || 0 - .25
  else if (af > 0 && divMP > theCore) { jCP = 1.25-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth));} // -.25 - -.5 || 1 -.75
  else if (af < 0 && divMP > theCore) { jCP =(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth))+.25 ; } // .25-.5  || .5 - .75    
  else if (af < 0 && divMP <= theCore) { jCP = .75-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth)) ; } // 0 - -.25  || .75 - .5
  return jCP;

  /* 
from .75-1
  if( af > 0 && divMP <= theCore) {jCP = (rect.left-leftBound)/(n*(rightBound-leftBound-divWidth)) + .875;}  // .875 < jCP < 1    || mp(.75, .75 + 1/n)
  else if (af > 0 && divMP > theCore) { jCP = 1.125-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth));} // 1 - .75
  else if (af < 0 && divMP > theCore) { jCP =(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth))+.625 ; } // .75 + mp(0, .25)
  else if (af < 0 && divMP <= theCore) { jCP = .875-(rect.left-leftBound)/(n*(rightBound-leftBound-divWidth)) ; } 

*/

//it takes ages to change, so i'll keep presets as comments :)
}

function update(box, boxinfo){
  box.style.setProperty('--scale', scaleCalc(boxinfo));        
  box.style.left = removePX(box.style.left) + velocity * boxinfo.atFront + "px";
}

function updateBackwards(box, boxinfo){
  box.style.setProperty('--scale', scaleCalc(boxinfo));        
  box.style.left = removePX(box.style.left) - velocity * boxinfo.atFront + "px";
}

function bounds(box, boxinfo){
  rect = box.getBoundingClientRect(); 
  if ((boxinfo.rectangle.left < leftBound )) {boxinfo.atFront = -boxinfo.atFront; box.style.zIndex = 2; }
  if ((boxinfo.rectangle.right > rightBound )) {boxinfo.atFront = -boxinfo.atFront; box.style.zIndex = 1;}
}
 
 function boundsBackwards(box, boxinfo){
  rect = box.getBoundingClientRect(); 
  if ((boxinfo.rectangle.left < leftBound )) {boxinfo.atFront = -boxinfo.atFront; box.style.zIndex = 1; }
  if ((boxinfo.rectangle.right > rightBound )) {boxinfo.atFront = -boxinfo.atFront; box.style.zIndex = 2;}
} 

const velocity = .75;

bug = true;
i = 0;
timeoutID = 0;

//@@@add line here
const box1info = {atFront: 1};
const box2info = {atFront: 1};
const box3info = {atFront: -1};

const box4info = {atFront: -1};
const box5info = {atFront: -1};
const box6info = {atFront: 1};

const box7info = {atFront: 1};
const box8info = {atFront: 1};
const box9info = {atFront: -1};

//(also add corresponding id's to DesktopCSS.css )
//@@@TO SCALE:: 
function setup(){
  i = 0;

  //@@@add line here
  box1 = document.getElementById("firstBox");
  box2 = document.getElementById("secondBox");
  box3 = document.getElementById("thirdBox");

  box4 = document.getElementById("b4");
  box5 = document.getElementById("b5");
  box6 = document.getElementById("b6");

  box7 = document.getElementById("b7");
  box8 = document.getElementById("b8");
  box9 = document.getElementById("b9");

  //@@@add line here
  box1info.rectangle = box1.getBoundingClientRect();
  box2info.rectangle = box2.getBoundingClientRect();
  box3info.rectangle = box3.getBoundingClientRect();

  box4info.rectangle = box4.getBoundingClientRect();
  box5info.rectangle = box5.getBoundingClientRect();
  box6info.rectangle = box6.getBoundingClientRect();

  box7info.rectangle = box7.getBoundingClientRect();
  box8info.rectangle = box8.getBoundingClientRect();
  box9info.rectangle = box9.getBoundingClientRect();

  const WIDTH1 = box1info.rectangle.right-box1info.rectangle.left;
  daddy = document.getElementById("earth");
  leftBound = daddy.getBoundingClientRect().left;
  rightBound = daddy.getBoundingClientRect().right;
  BIGW = Math.floor(rightBound - leftBound);
  console.log(BIGW);
  
  if(bug){
    //@@@add line here
    box1.style.left = `${3*BIGW/6 - 1-WIDTH1/2}px`;
    box2.style.left = `${5*BIGW/6 -5- WIDTH1/2}px`;   
    box3.style.left = `${BIGW/6-WIDTH1/2}px`; 

    box4.style.left = `${3*BIGW/6 +1- WIDTH1/2}px`;
    box5.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
    box6.style.left = `${BIGW/6-2-WIDTH1/2}px`; 

    box7.style.left = `${3*BIGW/6 +3- WIDTH1/2}px`;
    box8.style.left = `${5*BIGW/6 - WIDTH1/2}px`;   
    box9.style.left = `${BIGW/6-1-WIDTH1/2}px`; 
    //@@@add line here
    box1.style.zIndex = 2;
    box2.style.zIndex = 1;
    box3.style.zIndex = 1;   

    box4.style.zIndex = 1;
    box5.style.zIndex = 2;
    box6.style.zIndex = 2;   

    box7.style.zIndex = 2;
    box8.style.zIndex = 1;
    box9.style.zIndex = 1;  
  }
  bug = false;

  startRevolvingDoor();
}

//text revolving door only
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
  function myLoop() { 

    timeoutID = setTimeout(function() {

      i++;
       //@@@add line here
      box1info.rectangle = box1.getBoundingClientRect();
      box2info.rectangle = box2.getBoundingClientRect();
      box3info.rectangle = box3.getBoundingClientRect();

      box4info.rectangle = box4.getBoundingClientRect();
      box5info.rectangle = box5.getBoundingClientRect();
      box6info.rectangle = box6.getBoundingClientRect();

      box7info.rectangle = box7.getBoundingClientRect();
      box8info.rectangle = box8.getBoundingClientRect();
      box9info.rectangle = box9.getBoundingClientRect();

       //@@@add line here
      bounds(box1, box1info);
      bounds(box2, box2info);
      bounds(box3, box3info);

      boundsBackwards(box4, box4info);
      boundsBackwards(box5, box5info);
      boundsBackwards(box6, box6info);

      bounds(box7, box7info);
      bounds(box8, box8info);
      bounds(box9, box9info);
      
      //@@@add line here
      update(box1, box1info);
      update(box2, box2info);
      update(box3, box3info);

      updateBackwards(box4, box4info);
      updateBackwards(box5, box5info);
      updateBackwards(box6, box6info);

      update(box7, box7info);
      update(box8, box8info);
      update(box9, box9info);

 
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

//for text based -- prompts user to click to pause
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