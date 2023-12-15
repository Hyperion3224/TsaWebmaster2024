isClicked = false;
atFront = 1;
atFront2 = 1;
atFront3 = -1;
theta = 0;
pos = [0,0];
time = [0,0];
velocity = [0,0];
counter = 0;
daddy = 0;
leftBound = 0;
rightBound = 0;
bug = true;

/*
############################
set left and right detection and other stuff to center (when center crosses or something)
log velocity
############################
*/

function start(element) {
    isClicked = true;
    box1 = document.getElementById("firstBox");
    box2 = document.getElementById("secondBox");
    box3 = document.getElementById("thirdBox");
    
  daddy = element.parentNode;
  leftBound = daddy.getBoundingClientRect().left;
  rightBound = daddy.getBoundingClientRect().right; 
  
}

function end(){
    isClicked = false;
}

function arccospos(left, right){
  center = left+(right-left)/2
  theCore = leftBound+(rightBound-leftBound)/2 //center of earth
  if(center > theCore){ //to the right
    acospos = 2*(right)/(rightBound) -1;
  } else if(center < theCore) {
    acospos = 2*(left)/(rightBound) -1;
  } else {
    acospos=0;
  }

  if(acospos > 1){
    return Math.acos(0.9);
  } else if( acospos<-1){
    return Math.acos(-0.9);
  } else{
    return Math.acos(acospos);
  }

}

function slope(x1, y1, x2, y2){
  return (y2-y1)/(x2-x1);
}

function scaleCalc(left, right, aF) {
    center = right;
    theCore = leftBound+(rightBound-leftBound)/2;
    if(center < theCore && aF > 0){
     return slope(0, 2/3, theCore, 1)*(center-0)+ (2/3);
    } else if(center > theCore && aF > 0) {
     return slope(rightBound, 2/3, theCore, 1)*(center-rightBound)+ (2/3);
    } else if(center > theCore && aF < 0) { 
     return slope(rightBound, 2/3, theCore, 1/3)*(center-rightBound)+ (2/3);
    } else {
     return slope(0, 2/3, theCore, 1/3)*(center-0)+ (2/3);
    } 
}

function abcd(event, element){
  if(isClicked){
      counter++;
      index = counter%2;
      other = (counter+1)%2;
      pos[index] = event.clientX;
      time[index] = Date.now();

      if(bug){
        box1.style.left = 0+"px";
        box2.style.left = 600+"px";
        box3.style.left = 900+"px";
      }
      bug = false;

    if(element.id == "firstBox"){
      rect = element.getBoundingClientRect();
      srect = box2.getBoundingClientRect();      
      trect = box3.getBoundingClientRect();      
    } else if(element.id == "secondBox"){  
      rect = box1.getBoundingClientRect();
      srect = element.getBoundingClientRect();   
      trect = box3.getBoundingClientRect();   
    } else if (element.id == "thirdBox"){
      rect = box1.getBoundingClientRect();
      srect = box2.getBoundingClientRect();      
      trect = element.getBoundingClientRect();
    }

    function reLU(x){
      n=.9
      if (x>n){
        return n;
      } else if(x<-n) {
        return -n;
      } else {
        return x;
      }
    }
 
    dx = pos[index]-pos[other];
    dt = time[index]-time[other];
    velocity[index] = reLU(dx/dt);
 
    theta = arccospos(rect.left, rect.right);
  

    outofbounds = rightBound < rect.right
    outofbounds2 = rightBound < srect.right
    outofbounds3 = rightBound < trect.right
    oub11 = leftBound > rect.left;
    oub22 = leftBound > srect.left;
    oub33 = leftBound > trect.left;
    
   
    if(outofbounds) {
        rect.right = rightBound + "px";
        atFront *= -1;
        box1.style.zIndex = -1; 
    } 
    if(outofbounds2) {
        srect.right = rightBound + "px";
        atFront2 *= -1;
        box2.style.zIndex = -1; 
    }  
    if(outofbounds3) {
        trect.right = rightBound + "px";
        atFront3 *= -1;
        box3.style.zIndex =  -1;
    }  

    l = 15;

    minCheck1 = (atFront*l*velocity[index]*(Math.sin(theta)));
    minCheck2 = (atFront2*l*velocity[index]*(Math.sin(theta)));
    minCheck3 = (atFront3*l*velocity[index]*(Math.sin(theta)));

    
    t = 1;
    if(minCheck1 > 0 && minCheck1 < t){
      minCheck1 = t;
      minCheck2 = atFront2*t;
      minCheck3 = atFront3*t;
    } else if (minCheck1 < 0 && minCheck1 > -t ){
      minCheck1 = -t;
      minCheck2 = atFront2*t;
      minCheck3 = atFront3*t;
    }

    base = Number(box1.style.left.slice(0, box1.style.left.length-2));
    box1.style.scale = scaleCalc(rect.left, rect.right, atFront);
    box1.style.left = base + minCheck1+"px";

    base2 = Number(box2.style.left.slice(0, box2.style.left.length-2));
    box2.style.scale = scaleCalc(srect.left, srect.right, atFront2);
    box2.style.left = base2 +minCheck2 +"px";

    base3 = Number(box3.style.left.slice(0, box3.style.left.length-2));
    box3.style.scale = scaleCalc(trect.left, trect.right, atFront3);
    box3.style.left = base3 + minCheck3+"px";


    if (oub11) {
      box1.style.left = 0 + "px";
      atFront *= -1;
      box1.style.zIndex = 1;
  }
    if (oub22) {
      box2.style.left = 0 + "px";
      atFront2 *= -1;
      box2.style.zIndex = 1; 
  }
    if(oub33) {
      box3.style.left = 0 + "px";
      atFront3 *= -1;
      box3.style.zIndex =  1;
    }

    console.log("----");
 
  } 
}