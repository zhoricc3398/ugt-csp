function slider() {
    //
    var sliderContainer = document.getElementsByClassName("banner pb-1");

    // scope
    sliderContainer = sliderContainer[0];

    //
    var sliderElementsArray = sliderContainer.children;

    //
    sliderElementsArray = [...sliderElementsArray];

    //
    var sliderElementsArrayLength = sliderElementsArray.length;


    // show first element
    sliderElementsArray[0].classList.add('active');

    var i = 0;

    //
    function slideIn(callback) {
        if (sliderElementsArray[i].classList.contains('active')) {
            //
            sliderElementsArray[i].classList.remove('active');

            // console.log(sliderElementsArray[i], i, 'before');

            //
            callback();

            // console.log(sliderElementsArray[i], i, 'after');

            //
            sliderElementsArray[i].classList.add('active');
        }
    }

    //
    var extension = 1;

    //
    var sliderMoveExtension = function () {
        if (extension) {
            return i < (sliderElementsArrayLength - 1) ? i = i + 1 : i = 0;
        } else {
            return i > 0 ? i = i - 1 : i = sliderElementsArrayLength - 1;
        }
    }

    //
    var interval,
        sliderInTimeOut,
        countTime = 5000;

    //
    function topTeamSliderAutoPlay() {
        //
        extension = 1;

        interval = setInterval(() => {
            slideIn(sliderMoveExtension);
        }, countTime);
    };

    // call topTeamSliderAutoPlay
    topTeamSliderAutoPlay();

    //
    function pauseSlider() {
        clearInterval(interval);
    }

    //
    function createButtons(essence) {
        var elem = document.createElement("button");
        elem.setAttribute("class", `slider-arrow slider-arrow-${essence}`);
        elem.setAttribute("id", `slider-button-${essence}`);
        elem.setAttribute("type", "button");
        sliderContainer.appendChild(elem);
    }

    //
    createButtons('left');
    createButtons('right');

    var buttonLeft = document.getElementById('slider-button-left');

    //
    buttonLeft.addEventListener('click', () => {
        //
        pauseSlider();

        extension = 0;
        slideIn(sliderMoveExtension);

        // resume;
        topTeamSliderAutoPlay();

        //
        // console.log('click', buttonLeft, i);
    });

    //
    var buttonRight = document.getElementById('slider-button-right');

    //
    buttonRight.addEventListener('click', () => {
        //
        pauseSlider();

        extension = 1;
        slideIn(sliderMoveExtension);

        // resume;
        topTeamSliderAutoPlay();

        //
        // console.log('click', buttonRight, i);
    });

}

if(document.getElementsByClassName("banner pb-1")){
    slider();
}