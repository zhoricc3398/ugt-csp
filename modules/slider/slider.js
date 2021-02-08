//
var sliderContainer = document.getElementsByClassName("banner pb-1");

// scope
sliderContainer = sliderContainer[0];

//
var imagesArray = sliderContainer.getElementsByTagName("img");

//
var imagesArrayLength = imagesArray.length;

// images
imagesArray = [...imagesArray];

// clean
sliderContainer.innerHTML = "";

//
var imagesSrcArray = [];

//
imagesArray.forEach(x => {
    imagesSrcArray.push(x.src);
});

//
var sliderElementsArray = [];

//
function creatSliderElement(imgSrc){
    var element = document.createElement("div");
    element.setAttribute("class", "slider-item");
    element.style.backgroundImage = `url(${imgSrc})`;
    sliderElementsArray.push(element);
    sliderContainer.appendChild(element);
}

//appendChild
for(var i = 0; i < imagesArrayLength; i++){
    creatSliderElement(imagesSrcArray[i]);
}

// show first element
sliderElementsArray[0].classList.add('active');

var i = 0;

//
function slideIn(){
    if(sliderElementsArray[i].classList.contains('active')){
        //
        sliderElementsArray[i].classList.remove('active');
        
        //
        console.log(i, 'before');

       	//
        i < (imagesArrayLength - 1) ? i = i + 1 : i = 0;
        
        console.log(i, 'after');
        
        //
     	sliderElementsArray[i].classList.add('active');
    }
}

//
var interval;

//
function autoPlay(){
    interval = setInterval(()=>{
        slideIn();
    }, 5000)
};

//
autoPlay();