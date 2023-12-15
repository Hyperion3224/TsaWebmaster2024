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
    positionArray[index] = event.clientY; 
    if (counter % 2 == 1){
        diff = positionArray[index]-positionArray[(index+1)%2]; 
        if (diff > 0) { //coming from down
            x.className = "animation-up";
        } else { //coming from right
            x.className = "animation-up";
        }
    }
}
