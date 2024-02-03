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
        threshold: .5,
    }
)



//--------------------------------------------------------

const textrotated = document.querySelectorAll('.eep-img')
console.log(textrotated)
let counter3 = 0;
const textObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            counter3++;
            console.log(counter2)
            odd = entry.isIntersecting && counter3%2 === 0;
            even = entry.isIntersecting && counter3%2 === 1;
            if(counter3>0){
                if(odd){
                    entry.target.classList.add("show2")
                    textObserver.unobserve(entry.target)
                }else if(even){
                    entry.target.classList.add("show")
                    textObserver.unobserve(entry.target)
                }
            }
            else if (counter3 == 0){
                entry.target.classList.add("show")
                textObserver.unobserve(entry.target)
            }
        } )
    },
    {
        threshold: .5,
    }
)



//--------------------------------------------------------

const imagerotate = document.querySelectorAll('.eep-info')
let counter2 = -1;
const imgObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            counter2++;
            console.log(counter2)
            odd = entry.isIntersecting && counter2%2 === 0;
            even = entry.isIntersecting && counter2%2 === 1;
            if(counter2>0){
                if(odd){
                    entry.target.classList.add("show2")
                    imgObserver.unobserve(entry.target)
                }else if(even){
                    entry.target.classList.add("show")
                    imgObserver.unobserve(entry.target)
                }
            }
            else if (counter2 == 0){
                entry.target.classList.add("show2")
                imgObserver.unobserve(entry.target)
            }
            
        } )
    },
    {
        threshold: .5,
    }
)


    cards.forEach(card => {
        observer.observe(card)
    })
    imagerotate.forEach(img => {
        imgObserver.observe(img)
    })
    textrotated.forEach(text => {
        textObserver.observe(text)
    })


//--------------------------------------------------------
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