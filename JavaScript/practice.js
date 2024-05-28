var imageList = [
    "../Styles/Sources/EnergyEfficientImages/Green-Building-Renewables-Installed-Mitsubishi-Air-Source-Heat-Pump.jpg",
    "../Styles/Sources/EnergyEfficientImages/pexels-cottonbro-studio-6591427.jpg",
    "../Styles/Sources/EnergyEfficientImages/pexels-julia-m-cameron-6994983.jpg",
    "../Styles/Sources/EnergyEfficientImages/pexels-sippakorn-yamkasikorn-3696170.jpg",
    "../Styles/Sources/EnergyEfficientImages/photo-1607400201889-565b1ee75f8e.avif",
    "../Styles/Sources/EnergyEfficientImages/vegetarian-diet-plan-1296x728-feature.jpg"
];

var titles = [
    "Air Source Heat Pumps",
    "Recycling",
    "Donation",
    "Composting",
    "Insulation",
    "Diet"
];

var contents = [
    "Air Source Heat Pumps",
    "Recycling",
    "Donation",
    "Composting",
    "Insulation",
    "Diet"
];

var disclaimers = [
    "Air Source Heat Pumps",
    "Recycling",
    "Donation",
    "Composting",
    "Insulation",
    "Diet"
];

var index = 0;

document.addEventListener("DOMContentLoaded", function() {
    var array = ["title", "content", "disclaimer"];
        array.forEach(element => {
            const content = document.getElementById(element);
            setTimeout(() => {
              content.classList.add('visible');
            }, 100);
        });
    const bkg = document.getElementById("bkg");
    bkg.classList.add("bkgvis")
});

function next() {
    moveIndex(1);
    setText();
    console.log(index);
}

function prev() {
    moveIndex(-1);
    setText();
    console.log(index);
}

function setText(){
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const disclaimer = document.getElementById("disclaimer");
    const bkg = document.getElementById("bkg");

    
    bkg.classList.remove('bkgvis');
    setTimeout(() => {
        bkg.src = imageList[index];
        bkg.classList.add('bkgvis');
    }, 500); 

    setTimeout(() =>{
        switchContent(title,titles[index]);
    }, 400);
    setTimeout(() =>{
        switchContent(content,contents[index]);
    }, 500);
    setTimeout(() =>{
        switchContent(disclaimer,disclaimers[index]);
    }, 600);

    //title.innerHTML = titles[index];
    //content.innerHTML = contents[index];
    //disclaimer.innerHTML = disclaimers[index];
    
    setLine();
}

function setLine(){
    const lines = document.getElementsByClassName("practice-line");
    const line = lines[0];
    var lineTxt = ""

    for(i = 0; i < 6; i++){
        if(i==index){
            lineTxt += "auto ";
        } else {
            lineTxt += "5% ";
        }
    }
    line.setAttribute("style", "grid-template-columns: " + lineTxt);
}

function moveIndex(num){
    index += num;
    if(index < 0){
        index = 5;
    } else if(index > 5){
        index = 0;
    }
}


function switchContent(element,newContent) {
    const content = element;
    // Remove the visible class to trigger the fade-out effect
    content.classList.remove('visible');

    // Wait for the fade-out transition to complete
    setTimeout(() => {
      // Update the content
      content.innerHTML = newContent;

      // Trigger the fade-in effect
      content.classList.add('visible');
    }, 500); // Match this duration to the CSS transition duration
}

