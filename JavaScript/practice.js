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
    "&esmp; Air source heat pumps (ASHPs) are versatile renewable energy systems for heating and cooling. To optimize their use, understand their operation, assess your property, consider efficiency and costs, choose a suitable ASHP, and ensure proper installation and maintenance. ASHPs contribute to environmental benefits by enhancing energy efficiency, lowering environmental impact, and more.",
    "&esmp; Home recycling is an effective way to cut waste and environmental impact. Consider knowing local guidelines, separating recyclables, cleaning containers, buying recycled products, and educating others. Benefits include resource conservation, energy savings, less landfill waste, lower emissions, and job creation.",
    "&esmp; Donating old belongings, instead of discarding them, promotes environmental sustainability. Try researching local donation centers, exploring specialty programs, using online platforms, and more. Increased donations reduce landfill waste, conserve resources, promote reuse and circularity, save energy, cut emissions, support local communities, and encourage responsible consumption.",
    "&esmp; Composting is a rewarding and simple process. Numerous online guides and tips are readily available. It is an environmentally friendly waste management practice with benefits such as reduced landfill waste, erosion control, less need for chemical fertilizers and pesticides, water conservation, and a lower carbon footprint.",
    "&esmp; Enhancing home insulation and energy efficiency benefits both comfort and the environment. Assess your home, select appropriate insulation, and install it professionally or DIY. This improves energy efficiency, reduces carbon footprint, conserves resources, addresses climate change, enhances indoor air quality, and promotes long-term sustainability.",
    "&esmp; Reducing meat intake benefits the environment. Try exploring plant-based proteins, trying meat substitutes, adjusting recipes, gradually cutting meat consumption, and practicing mindful eating. Environmental gains include lower greenhouse gas emissions, efficient land use, water conservation, reduced deforestation, less pollution, energy savings, and biodiversity preservation."
];

var disclaimers = [
    "Note that performance and efficiency of air source heat pumps may vary based on climate conditions and specific installation factors.",
    "Note that recycling processes and the acceptance of materials can vary by location, and not all items are recyclable in every area.",
    "Note that donating items is subject to the acceptance policies of the receiving organization, and not all items may be suitable or accepted for donation.",
    "Note that composting is subject to local regulations and guidelines, and not all materials are suitable for composting in every environment.",
    "Note that insulation effectiveness can vary based on material type, installation quality, and environmental conditions.",
    "NOte that reducing meat in your diet may have different health and nutritional impacts depending on individual dietary needs and should be approached with balanced nutritional planning."
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

