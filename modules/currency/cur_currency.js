var cur_wrapper_home = document.getElementById('home');
var cur_wrapper_catalogue = document.getElementById('catalogue');

if (cur_wrapper_home || cur_wrapper_catalogue) {
    var cur_container = document.getElementsByClassName('price-details');
    cur_container = [...cur_container];

    function cur_event(event) {
        //
        var innerTextContainer = event.target.parentElement.getElementsByClassName('price')[0].getElementsByTagName('div')[0].getElementsByTagName('span');
        
        //
        if (isLoggedIn()) {
            //
            console.log(innerTextContainer, event.target.parentElement);

            //
            innerTextContainer = [...innerTextContainer][1].toString().replace('$',' ');
        } else {
            innerTextContainer = [...innerTextContainer][1];
        }

        //
        var subLenght, cur_gel = cur_format(innerTextContainer.innerText);

        //
        cur_gel_to_usd(innerTextContainer.innerText).toString().split('.')[0].length > 1 ? subLenght = 5 : subLenght = 4;

        //
        if (!hasContainerActiveState(event.target.parentElement)) {
            innerTextContainer.innerText = `$${cur_gel_to_usd(innerTextContainer.innerText).toString().substring(0, subLenght)}`;
        } else {
            innerTextContainer.innerText = `${event.target.parentElement.getAttribute('gel-currency')} ₾`;
        }

        //
        cur_addAttr(event.target.parentElement, cur_gel);
    }

    function cur_append_transformer_button_home() {
        cur_container.forEach(x => {
            //
            var elem = document.createElement('div');
            elem.setAttribute('class', 'currency-transformer-container');
            elem.innerText = 'United States Dollar';

            //
            elem.onclick = function (e) {
                cur_event(e);
            }

            //
            x.appendChild(elem);

        });
    }

    //
    function cur_append_transformer_button_catalogue() {
        cur_container.forEach(x => {
            //
            var elem = document.createElement('div');
            elem.setAttribute('class', 'currency-transformer-container');
            elem.innerText = 'United States Dollar';

            x.offsetParent.getElementsByClassName('product')[0].onclick = function (e) {
                //
                cur_restart_event_from_preview();
            }

            //
            x.appendChild(elem);

        });
    }

    //
    function cur_restart_event_from_preview() {
        var i = 0;
        var interval = setInterval(() => {
            i++;
            var elemContainer;

            if (window.innerWidth < 992) {
                elemContainer = document.getElementsByClassName('modal-body')[0].getElementsByClassName('currency-transformer-container')[0];
            } else {
                elemContainer = document.getElementById('preview-placeholder').getElementsByClassName('currency-transformer-container')[0];
            }

            //
            if (i === 100) {
                clearInterval(interval);
            }

            elemContainer.onclick = function (e) {
                cur_event(e);
                clearInterval(interval);
            }
           
        }, 100);

    }

    function cur_format(value) {
        let replaceForTransform = value.split(' ')[0].replace(',', '.');
        return Number(replaceForTransform);
    }

    function cur_gel_to_usd(cur_gel) {
        return cur_format(cur_gel) / USD_TO_GEL;
    }

    // function cur_usd_to_gel(cur_gel) {
    //     return cur_format(cur_gel) * USD_TO_GEL;
    // }

    function hasContainerActiveState(elem) {
        return elem.classList.contains('active')
    }

    function hasContainerCurrencyState(elem) {
        return elem.hasAttribute('gel-currency');
    }

    function cur_addAttr(elem, gel_currency) {
        //
        hasContainerActiveState(elem) ? elem.classList.remove('active') : elem.classList.add('active');

        if (!hasContainerCurrencyState(elem)) {
            elem.setAttribute('gel-currency', gel_currency);
        }
    }

    if (cur_wrapper_home) {
        //
        cur_append_transformer_button_home();
    } else {
        //
        cur_append_transformer_button_catalogue();
    }

}